const departamentosService = require('../service/departamentosSrv');
const { obtenerCamposFaltantes } = require('../utils/validaciones');
const { enviarError, enviarExito } = require('../utils/respuestas');
const atrapaErrores = require('../utils/atrapaErrores');

const departamentosController = {
  // Crear un departamento
  crearDepartamento: atrapaErrores(async (req, res) => {
    const faltantes = obtenerCamposFaltantes(req.body, ['nombre']);
    if (faltantes.length) {
      return enviarError(res, 400, `Falta campo: ${faltantes.join(', ')}`);
    }
    // Asumimos que el servicio podría devolver el id creado; si no, ajusta según tu implementación
    await departamentosService.crearDepartamento(
      req.body.nombre,
      req.body.descripcion,
      req.body.imagen
    );
    // Devolvemos un mensaje claro y código 201
    return enviarExito(res, {}, 'Departamento creado', 201);
  }),

  // Listar departamentos (devuelve directamente el array para el front)
  listarDepartamentos: atrapaErrores(async (req, res) => {
    const lista = await departamentosService.listarDepartamentos();
    return res.status(200).json(lista);
  }),

  // Obtener un departamento por ID
  obtenerDepartamentoPorId: atrapaErrores(async (req, res) => {
    const dpto = await departamentosService.obtenerDepartamentoPorId(req.params.id);
    if (!dpto) {
      return enviarError(res, 404, 'Departamento no encontrado');
    }
    // Aquí devolvemos el objeto concreto
    return res.status(200).json(dpto);
  }),

  // Actualizar un departamento
  actualizarDepartamento: atrapaErrores(async (req, res) => {
    const faltantes = obtenerCamposFaltantes(req.body, ['nombre']);
    if (faltantes.length) {
      return enviarError(res, 400, `Falta campo: ${faltantes.join(', ')}`);
    }
    await departamentosService.actualizarDepartamento(
      req.params.id,
      req.body.nombre,
      req.body.descripcion,
      req.body.imagen
    );
    return enviarExito(res, {}, 'Departamento actualizado');
  }),

  // Eliminar un departamento
  eliminarDepartamento: atrapaErrores(async (req, res) => {
    await departamentosService.eliminarDepartamento(req.params.id);
    return enviarExito(res, {}, 'Departamento eliminado');
  })
};

module.exports = departamentosController;
