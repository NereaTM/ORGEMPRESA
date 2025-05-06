const config = require('./config/configuration');
const cors = require('cors');
const express = require('express');
const path = require('path');

const promClient = require('prom-client');
const { 
  httpRequestDurationSeconds,
   httpRequestsTotal,
   inFlightRequests 
} = require('./config/metrics');


const app = express();
const port = config.server.port;

//promClient.register.setDefaultLabels({
//  service: 'orgempresa',
//    env: process.env.NODE_ENV || 'development'
//});

// Recoge métricas por defecto
promClient.collectDefaultMetrics();
 
// Recoger las métricas configuradas en config/metrics
app.use((req, res, next) => {
  // Anota la request en vuelo
  inFlightRequests.inc();

  // Inicia un timer para comenzar a calcular la duración de la request
  const end = httpRequestDurationSeconds.startTimer();

  const method = req.method;
  const path = req.route ? req.route.path : req.path; 

  // Cada vez que una request termina, se recogen las métricas configuradas
  res.on('finish', () => {
      const statusCode = res.statusCode;

      // Captura la duración de la petición
      end({ method, path, code: statusCode }); 
      // Incrementa el contador de peticiones HTTP
      httpRequestsTotal.inc({
          code: statusCode,
          method: method.toLowerCase(),
          path: path
      });

      // Decrementa el contador de peticiones en vuelo
      inFlightRequests.dec();
  });

  next();
});

// Define el endpoint que usará prometheus para recoger las métricas
app.get('/metrics', async(req, res) => {
  try {
      res.set('Content-Type', promClient.register.contentType);
      res.end(await promClient.register.metrics());
  } catch (error) {
      res.status(500).end(error);
  }
});

// Rutas 
const departamentosRouter = require('./route/departamentosRts');
const empleadosRouter = require('./route/empleadosRts');
const loginRouter = require('./route/loginRts');
const usuariosRouter = require('./route/usuariosRts');

// Middlewares 
app.use(cors());
app.use(express.json()); 

// EndPoints
app.use('/departamentos', departamentosRouter);
app.use('/empleados', empleadosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/login', loginRouter);

// Frontend 
app.use(express.static(path.join(__dirname, '../../frontend/src')));

// Iniciar servidor 
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}

module.exports = app;