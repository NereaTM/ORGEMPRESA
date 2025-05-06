// Envía una respuesta de éxito con formato uniforme

function enviarExito(res, datos = {}, mensaje = 'OK', codigo = 200) {
    return res.status(codigo).json({ success: true, message: mensaje, ...datos });
}

//  Envía una respuesta de error con formato uniforme

function enviarError(res, codigo = 500, mensaje = 'Error interno', error = null) {
    const cuerpo = { success: false, message: mensaje };
    if (error) cuerpo.error = error.toString();
    return res.status(codigo).json(cuerpo);
}
  
module.exports = { enviarExito, enviarError };
  