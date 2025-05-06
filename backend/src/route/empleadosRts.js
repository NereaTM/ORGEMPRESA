const express = require('express');
const router = express.Router();
const empleadosController = require('../controller/empleadosClr');

// Rutas de empleados
router.post('/', empleadosController.crearEmpleado);
router.get('/', empleadosController.listarEmpleados);
router.get('/:id', empleadosController.obtenerEmpleadoPorId);
router.put('/:id', empleadosController.actualizarEmpleado);
router.delete('/:id', empleadosController.eliminarEmpleado);

module.exports = router;