const jwt = require('jsonwebtoken');
const { promisify } = require('util'); 
const config = require('../config');

// Middleware para verificar el token (JWT)
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const [, token] = authHeader.split(' '); // Extraer el token del header "Bearer <token>"

  try {
    // Verificar el token
    const decoded = await promisify(jwt.verify)(token, config.jwt.secret);
    req.usuarioId = decoded.id; // Añadir el ID del usuario al objeto `req` y así usarlo en los controladores
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;