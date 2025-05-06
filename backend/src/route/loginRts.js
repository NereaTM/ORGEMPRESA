const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginClr');

// Inicio de sesion
router.post('/', loginController.iniciarSesion);

module.exports = router;