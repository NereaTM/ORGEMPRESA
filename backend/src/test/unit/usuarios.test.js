const httpMocks = require('node-mocks-http');
const { describe, it, afterEach, expect } = require('@jest/globals');

jest.mock('../../service/usuariosSrv');

const usuariosController = require('../../controller/usuariosClr');
const usuariosService    = require('../../service/usuariosSrv');
const {
  mockUsuarioParaRegistrar,
  mockRespuestaUsuario
} = require('./mocks/usuarios');

const mockedCreate = jest.spyOn(usuariosService, 'crearUsuario');

afterEach(() => jest.clearAllMocks());

describe('usuarios controller (unit)', () => {
  it('POST /usuarios → crea usuario', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/usuarios',
      body: mockUsuarioParaRegistrar
    });
    const res = httpMocks.createResponse();
    mockedCreate.mockResolvedValueOnce(mockRespuestaUsuario.id);

    await usuariosController.crearUsuario(req, res);

    expect(mockedCreate).toHaveBeenCalledWith(
      mockUsuarioParaRegistrar.usuario,
      mockUsuarioParaRegistrar.contraseña
    );
    expect(res.statusCode).toBe(201);
    const data = res._getJSONData();
    expect(data).toHaveProperty('message', 'Usuario creado');
    expect(data).toHaveProperty('usuario', mockUsuarioParaRegistrar.usuario);
  });
});
