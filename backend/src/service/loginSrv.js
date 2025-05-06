const db = require('../config/database');
const bcrypt = require('bcryptjs');

const loginService = {
  verificarCredenciales: async (usuario, contraseña) => {
    try {
      const rows = await db('USUARIOS').where({ usuario });
    // console.log('Query result:', rows);

      if (rows.length === 0) {
       // console.log('Usuario no encontrado');
        return null;
      }

      const usuarioEncontrado = rows[0];
    // console.log('Usuario encontrado:', usuarioEncontrado);

      // Comparar contraseña hasheada
      const contraseñaValida = await bcrypt.compare(contraseña, usuarioEncontrado.contraseña);
      //console.log('¿Contraseña válida?', contraseñaValida);

      if (contraseñaValida) {
        const { contraseña, ...usuarioSinContraseña } = usuarioEncontrado;
        return usuarioSinContraseña;
      } else {
        return null;
      }
    } catch (error) {
    // console.error('Error en loginService:', error);
      throw error;
    }
  }
};

module.exports = loginService;
