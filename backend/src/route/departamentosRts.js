const express = require('express');
const router = express.Router();
const departamentosController = require('../controller/departamentosClr');

// Rutas de departamentos
router.post('/', departamentosController.crearDepartamento);
router.get('/', departamentosController.listarDepartamentos);
router.get('/:id', departamentosController.obtenerDepartamentoPorId);
router.put('/:id', departamentosController.actualizarDepartamento);
router.delete('/:id', departamentosController.eliminarDepartamento);

module.exports = router;