// Devuelve un array con los nombres de campos que faltan en `datos`

function obtenerCamposFaltantes(datos, camposRequeridos) {
    return camposRequeridos.filter(campo =>
      datos[campo] === undefined ||
      datos[campo] === null ||
      datos[campo] === ''
    );
  }
  
  module.exports = { obtenerCamposFaltantes };
  