const jwt = require('jsonwebtoken');
const { generarToken, verificarToken } = require('../../utils/autentificacion');
const { enviarExito, enviarError } = require('../../utils/respuestas');
const { obtenerCamposFaltantes } = require('../../utils/validaciones');
const atrapaErrores = require('../../utils/atrapaErrores');
const httpMocks = require('node-mocks-http');


describe('utils: autenticación', () => {
  test('generarToken y verificarToken deben firmar y verificar payload', () => {
    const payload = { foo: 'bar' };
    const token = generarToken(payload);
    expect(typeof token).toBe('string');
    const decoded = verificarToken(token);
    expect(decoded.foo).toBe('bar');
  });
});

describe('utils: respuestas', () => {
  let res;
  beforeEach(() => { res = httpMocks.createResponse(); });

  test('enviarExito envía JSON correcto y status', () => {
    enviarExito(res, { x: 1 }, 'Todo bien', 201);
    const json = res._getJSONData();
    expect(res.statusCode).toBe(201);
    expect(json).toMatchObject({ success: true, message: 'Todo bien', x: 1 });
  });

  test('enviarError envía JSON de error y status', () => {
    enviarError(res, 400, 'Mal', new Error('falla'));
    const json = res._getJSONData();
    expect(res.statusCode).toBe(400);
    expect(json).toMatchObject({ success: false, message: 'Mal', error: 'Error: falla' });
  });
});

describe('utils: validaciones', () => {
  test('obtenerCamposFaltantes devuelve campos que faltan', () => {
    const datos = { a: 1, b: '', c: null };
    const faltantes = obtenerCamposFaltantes(datos, ['a','b','c','d']);
    expect(faltantes).toEqual(['b','c','d']);
  });
});

describe('middleware atrapaErrores', () => {
  test('cuando la función lanza, next es llamado con el error', async () => {
    const fnErr = async () => { throw new Error('boom'); };
    const mw = atrapaErrores(fnErr);
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await mw(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].message).toBe('boom');
  });

  test('cuando la función acaba bien, next no se llama', async () => {
    const fnOk = async (req, res) => res.status(200).send('ok');
    const mw = atrapaErrores(fnOk);
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await mw(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res._getData()).toBe('ok');
  });
});
