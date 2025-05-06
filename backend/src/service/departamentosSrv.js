const db = require('../config/database');

const departamentosService = {
  crearDepartamento: async (nombre, descripcion, imagen) => {
    const [result] = await db.raw(
      'INSERT INTO DEPARTAMENTOS (nombre, descripcion, imagen) VALUES (?, ?, ?)',
      [nombre, descripcion, imagen]
    );
    return result.insertId;
  },

  listarDepartamentos: async () => {
    const [rows] = await db.raw('SELECT * FROM DEPARTAMENTOS');
    return rows;
  },

  obtenerDepartamentoPorId: async (id) => {
    const [rows] = await db.raw('SELECT * FROM DEPARTAMENTOS WHERE id_departamento = ?', [id]);
    return rows[0];
  },

  actualizarDepartamento: async (id, nombre, descripcion, imagen) => {
    const [result] = await db.raw(
      'UPDATE DEPARTAMENTOS SET nombre = ?, descripcion = ?, imagen = ? WHERE id_departamento = ?',
      [nombre, descripcion, imagen, id]
    );
    return result.affectedRows;
  },

  eliminarDepartamento: async (id) => {
    const [result] = await db.raw('DELETE FROM DEPARTAMENTOS WHERE id_departamento = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = departamentosService;
