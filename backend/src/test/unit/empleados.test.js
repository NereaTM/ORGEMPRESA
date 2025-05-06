const httpMocks = require('node-mocks-http');
const { describe, it, afterEach, expect } = require('@jest/globals');

jest.mock('../../service/empleadosSrv');

const empleadosController = require('../../controller/empleadosClr');
const empleadosService    = require('../../service/empleadosSrv');
const {
  mockEmpleadoArray,
  mockUsuarioParaRegistrar,
  mockRespuestaEmpleado
} = require('./mocks/empleados');

const mockedList    = jest.spyOn(empleadosService, 'listarEmpleados');
const mockedGetById = jest.spyOn(empleadosService, 'obtenerEmpleadoPorId');
const mockedCreate  = jest.spyOn(empleadosService, 'crearEmpleado');
const mockedUpdate  = jest.spyOn(empleadosService, 'actualizarEmpleado');
const mockedDelete  = jest.spyOn(empleadosService, 'eliminarEmpleado');

afterEach(() => {
  jest.clearAllMocks();
});

describe('empleados controller (unit)', () => {

  it('GET /empleados → lista empleados', async () => {
    const req = httpMocks.createRequest({ method: 'GET', url: '/empleados' });
    const res = httpMocks.createResponse();
    mockedList.mockResolvedValueOnce(mockEmpleadoArray);

    await empleadosController.listarEmpleados(req, res);

    expect(mockedList).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockEmpleadoArray);
  });

  it('GET /empleados/:id → obtiene un empleado por id', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/empleados/1',
      params: { id: '1' }
    });
    const res = httpMocks.createResponse();
    mockedGetById.mockResolvedValueOnce(mockEmpleadoArray[0]);

    await empleadosController.obtenerEmpleadoPorId(req, res);

    expect(mockedGetById).toHaveBeenCalledWith('1');
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockEmpleadoArray[0]);
  });

  it('POST /empleados → crea un empleado', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/empleados',
      body: mockUsuarioParaRegistrar
    });
    const res = httpMocks.createResponse();
    mockedCreate.mockResolvedValueOnce(mockRespuestaEmpleado.id_empleado);

    await empleadosController.crearEmpleado(req, res);

    expect(mockedCreate).toHaveBeenCalledWith(
      mockUsuarioParaRegistrar.nombre,
      mockUsuarioParaRegistrar.dni,
      mockUsuarioParaRegistrar.id_departamento,
      mockUsuarioParaRegistrar.telefono,
      mockUsuarioParaRegistrar.email
    );
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toHaveProperty('message', 'Empleado creado');
  });

  it('PUT /empleados/:id → actualiza un empleado', async () => {
    const updated = Object.assign({}, mockUsuarioParaRegistrar, { telefono: '000', email: 'x@x.com' });
    const req = httpMocks.createRequest({
      method: 'PUT',
      url: '/empleados/3',
      params: { id: '3' },
      body: updated
    });
    const res = httpMocks.createResponse();
    mockedUpdate.mockResolvedValueOnce(1);

    await empleadosController.actualizarEmpleado(req, res);

    expect(mockedUpdate).toHaveBeenCalledWith(
      '3',
      updated.nombre,
      updated.dni,
      updated.id_departamento,
      updated.telefono,
      updated.email
    );
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toHaveProperty('message', 'Empleado actualizado');
  });

  it('DELETE /empleados/:id → elimina un empleado', async () => {
    const req = httpMocks.createRequest({
      method: 'DELETE',
      url: '/empleados/3',
      params: { id: '3' }
    });
    const res = httpMocks.createResponse();
    mockedDelete.mockResolvedValueOnce(1);

    await empleadosController.eliminarEmpleado(req, res);

    expect(mockedDelete).toHaveBeenCalledWith('3');
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toHaveProperty('message', 'Empleado eliminado');
  });

});
