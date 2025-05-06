const db = require('../config/database');
const bcrypt = require('bcryptjs');

// Servicios para crear usuarios
const usuariosService = {
  // Crear un usuario
  crearUsuario: async (usuario, contraseña) => {
    try {
      // Encriptar la contraseña
      const salt = await bcrypt.genSalt(10);
      const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);
      
      // Insertar el nuevo usuario en la base de datos
      const [id] = await db('USUARIOS').insert({
        usuario,
        contraseña: contraseñaEncriptada
      });

      return id;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = usuariosService;