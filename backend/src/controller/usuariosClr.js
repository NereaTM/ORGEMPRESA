const usuariosService = require('../service/usuariosSrv');
const { obtenerCamposFaltantes } = require('../utils/validaciones');
const { enviarExito, enviarError } = require('../utils/respuestas');
const atrapaErrores = require('../utils/atrapaErrores');

const usuariosController = {
  crearUsuario: atrapaErrores(async (req, res) => {
    const requeridos = ['usuario', 'contraseña'];
    const faltantes = obtenerCamposFaltantes(req.body, requeridos);
    if (faltantes.length) {
      return enviarError(res, 400, `Faltan campos: ${faltantes.join(', ')}`);
    }
    const id = await usuariosService.crearUsuario(req.body.usuario, req.body.contraseña);
    return enviarExito(res, { id, usuario: req.body.usuario }, 'Usuario creado', 201);
  })
};

module.exports = usuariosController;
