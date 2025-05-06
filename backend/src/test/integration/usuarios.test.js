const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app');

chai.use(chaiHttp);
chai.should();

describe('Usuarios', () => {

  describe('POST /usuarios', () => {
    it('debería crear un nuevo usuario', (done) => {
      chai.request(app)
        .post('/usuarios')
        .send({
          usuario: 'nerea',
          contraseña: '123456'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Usuario creado');
          expect(res.body).to.have.property('usuario').eql('nerea');
          done();
        });
    });

    it('debería fallar por falta de contraseña', (done) => {
      chai.request(app)
        .post('/usuarios')
        .send({ usuario: 'invalido' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').include('Faltan campos');
          done();
        });
    });
  });

});
