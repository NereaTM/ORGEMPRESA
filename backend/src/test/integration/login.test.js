const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app');

chai.use(chaiHttp);
chai.should();

describe('Login', () => {
  const usuarioTest = {
    usuario: 'admin',
    contraseña: '123456'
  };

  // Creamos el usuario antes del test de login
  before((done) => {
    chai.request(app)
      .post('/usuarios')
      .send(usuarioTest)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  describe('POST /login', () => {
    it('debería iniciar sesión con credenciales correctas', (done) => {
      chai.request(app)
        .post('/login')
        .send(usuarioTest)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Inicio de sesión exitoso');
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('usuario');
          done();
        });
    });

    it('debería fallar con credenciales incorrectas', (done) => {
      chai.request(app)
        .post('/login')
        .send({
          usuario: 'usuario_que_no_existe',
          contraseña: 'contraseña_invalida'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').eql('Usuario o contraseña incorrectos');
          done();
        });
    });
  });
});
