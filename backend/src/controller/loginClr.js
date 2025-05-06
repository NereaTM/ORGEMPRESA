const loginService = require('../service/loginSrv');
const { generarToken } = require('../utils/autentificacion');
const { enviarExito, enviarError } = require('../utils/respuestas');
const atrapaErrores = require('../utils/atrapaErrores');

const loginClr = {
  iniciarSesion: atrapaErrores(async (req, res) => {
    const { usuario, contraseña } = req.body;
    const usuarioEncontrado = await loginService.verificarCredenciales(usuario, contraseña);
      //ERRORRRRRRRRRRRRRRRRRRRRRRRRRRR console.log(usuarioEncontrado)
      
    if (!usuarioEncontrado) {
      return enviarError(res, 401, 'Usuario o contraseña incorrectos');
    }
    const token = generarToken({
      id: usuarioEncontrado.id,
      usuario: usuarioEncontrado.usuario
    });
    return enviarExito(
      res,
      { token, usuario: usuarioEncontrado },
      'Inicio de sesión exitoso'
    );
  })
};
  
module.exports = loginClr;