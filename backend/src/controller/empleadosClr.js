const empleadosService = require('../service/empleadosSrv');
const { obtenerCamposFaltantes } = require('../utils/validaciones');
const { enviarError, enviarExito } = require('../utils/respuestas');
const atrapaErrores = require('../utils/atrapaErrores');

const empleadosController = {
  // Crear un empleado
  crearEmpleado: atrapaErrores(async (req, res) => {
    const requeridos = ['nombre', 'dni', 'id_departamento'];
    const faltantes = obtenerCamposFaltantes(req.body, requeridos);
    if (faltantes.length) {
      return enviarError(res, 400, `Faltan campos: ${faltantes.join(', ')}`);
    }
    await empleadosService.crearEmpleado(
      req.body.nombre,
      req.body.dni,
      req.body.id_departamento,
      req.body.telefono,
      req.body.email
    );
    // Respondemos creación con código 201 y mensaje uniforme
    return enviarExito(res, {}, 'Empleado creado', 201);
  }),

  // Listar empleados
  listarEmpleados: atrapaErrores(async (req, res) => {
    const lista = await empleadosService.listarEmpleados();
    // Devolvemos directamente el array para que el front lo reciba igual
    return res.status(200).json(lista);
  }),

  // Obtener un empleado por ID
  obtenerEmpleadoPorId: atrapaErrores(async (req, res) => {
    const emp = await empleadosService.obtenerEmpleadoPorId(req.params.id);
    if (!emp) {
      return enviarError(res, 404, 'Empleado no encontrado');
    }
    // Devolvemos el objeto empleado
    return res.status(200).json(emp);
  }),

  // Actualizar un empleado
  actualizarEmpleado: atrapaErrores(async (req, res) => {
    const requeridos = ['nombre', 'dni', 'id_departamento'];
    const faltantes = obtenerCamposFaltantes(req.body, requeridos);
    if (faltantes.length) {
      return enviarError(res, 400, `Faltan campos: ${faltantes.join(', ')}`);
    }
    await empleadosService.actualizarEmpleado(
      req.params.id,
      req.body.nombre,
      req.body.dni,
      req.body.id_departamento,
      req.body.telefono,
      req.body.email
    );
    // Respondemos éxito de actualización
    return enviarExito(res, {}, 'Empleado actualizado');
  }),

  // Eliminar un empleado
  eliminarEmpleado: atrapaErrores(async (req, res) => {
    await empleadosService.eliminarEmpleado(req.params.id);
    // Respondemos éxito de eliminación
    return enviarExito(res, {}, 'Empleado eliminado');
  })
};

module.exports = empleadosController;
