const express = require('express');
const router = express.Router();
const usuariosController = require('../controller/usuariosClr');

// Crear un usuario
router.post('/', usuariosController.crearUsuario);

module.exports = router;