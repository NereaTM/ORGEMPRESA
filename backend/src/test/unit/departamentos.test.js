const httpMocks = require('node-mocks-http');
const { describe, it, afterEach, expect } = require('@jest/globals');

jest.mock('../../service/departamentosSrv');

const deptController = require('../../controller/departamentosClr');
const deptService = require('../../service/departamentosSrv');
const {
  mockDepartamentoArray,
  mockDepartamentoParaRegistrar,
  mockRespuestaDepartamento
} = require('./mocks/departamentos');

const mockedList = jest.spyOn(deptService, 'listarDepartamentos');
const mockedCreate = jest.spyOn(deptService, 'crearDepartamento');

afterEach(() => jest.clearAllMocks());

describe('departamentos controller (unit)', () => {
  it('GET /departamentos → lista departamentos', async () => {
    const req = httpMocks.createRequest({ method: 'GET', url: '/departamentos' });
    const res = httpMocks.createResponse();
    mockedList.mockResolvedValueOnce(mockDepartamentoArray);

    await deptController.listarDepartamentos(req, res);

    expect(mockedList).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockDepartamentoArray);
  });

  it('POST /departamentos → crea departamento', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/departamentos',
      body: mockDepartamentoParaRegistrar
    });
    const res = httpMocks.createResponse();
    mockedCreate.mockResolvedValueOnce(mockRespuestaDepartamento.id_departamento);

    await deptController.crearDepartamento(req, res);

    expect(mockedCreate).toHaveBeenCalledWith(
      mockDepartamentoParaRegistrar.nombre,
      mockDepartamentoParaRegistrar.descripcion,
      mockDepartamentoParaRegistrar.imagen
    );
    expect(res.statusCode).toBe(201);
    const data = res._getJSONData();
    expect(data).toHaveProperty('message', 'Departamento creado');
  });
});
