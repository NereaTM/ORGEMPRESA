const jwt = require('jsonwebtoken');
const config = require('../config/configuration');

// Genera un token JWT leyendo la configuración en tiempo de ejecución
function generarToken(payload) {
  const secret = config.jwt.secret;
  const expires = config.jwt.expiresIn;
  if (!secret) throw new Error('JWT_SECRET no está definido');
  return jwt.sign(payload, secret, { expiresIn: expires });
}

// Verifica y decodifica el token leyendo la clave en tiempo de ejecución
function verificarToken(token) {
  const secret = config.jwt.secret;
  if (!secret) throw new Error('JWT_SECRET no está definido');
  return jwt.verify(token, secret);
}

module.exports = { generarToken, verificarToken };