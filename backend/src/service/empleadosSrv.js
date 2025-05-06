const db = require('../config/database');

// Servicios para empleados
const empleadosService = {
  crearEmpleado: async (nombre, dni, id_departamento, telefono, email) => {
    const [result] = await db.raw(
      'INSERT INTO EMPLEADOS (nombre, dni, id_departamento, telefono, email) VALUES (?, ?, ?, ?, ?)',
      [nombre, dni, id_departamento, telefono, email]
    );
    return result.insertId;
  },

  listarEmpleados: async () => {
    const [rows] = await db.raw('SELECT * FROM EMPLEADOS');
    return rows;
  },

  obtenerEmpleadoPorId: async (id) => {
    const [rows] = await db.raw('SELECT * FROM EMPLEADOS WHERE id_empleado = ?', [id]);
    return rows[0];
  },

  actualizarEmpleado: async (id, nombre, dni, id_departamento, telefono, email) => {
    const [result] = await db.raw(
      'UPDATE EMPLEADOS SET nombre = ?, dni = ?, id_departamento = ?, telefono = ?, email = ? WHERE id_empleado = ?',
      [nombre, dni, id_departamento, telefono, email, id]
    );
    return result.affectedRows;
  },

  eliminarEmpleado: async (id) => {
    const [result] = await db.raw('DELETE FROM EMPLEADOS WHERE id_empleado = ?', [id]);
    return result.affectedRows;
  },
};

module.exports = empleadosService;
