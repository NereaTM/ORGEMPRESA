// Envuelve funciones async para pasar errores a next()

const atrapaErrores = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = atrapaErrores;