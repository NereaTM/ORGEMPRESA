const httpMocks = require('node-mocks-http');
const { describe, it, afterEach, expect } = require('@jest/globals');

jest.mock('../../service/loginSrv');
jest.mock('../../utils/autentificacion', () => ({
  generarToken: () => 'token_de_prueba'
}));

const loginController = require('../../controller/loginClr');
const loginService    = require('../../service/loginSrv');
const {
  credencialesMock,
  usuarioDesdeServicio,
  tokenSimulado
} = require('./mocks/login');

const mockedVerify = jest.spyOn(loginService, 'verificarCredenciales');

afterEach(() => jest.clearAllMocks());

describe('login controller (unit)', () => {
  it('POST /login → 401 si credenciales inválidas', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: { usuario: credencialesMock.usuario, contraseña: 'wrong' }
    });
    const res = httpMocks.createResponse();
    mockedVerify.mockResolvedValueOnce(null);

    await loginController.iniciarSesion(req, res);

    expect(res.statusCode).toBe(401);
    const data = res._getJSONData();
    expect(data).toHaveProperty('message', 'Usuario o contraseña incorrectos');
  });

  it('POST /login → 200 y devuelve token y usuario', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: credencialesMock
    });
    const res = httpMocks.createResponse();
    mockedVerify.mockResolvedValueOnce(usuarioDesdeServicio);

    await loginController.iniciarSesion(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data).toHaveProperty('token', tokenSimulado);
    expect(data).toHaveProperty('usuario');
    expect(data.usuario).toMatchObject(usuarioDesdeServicio);
  });
});
