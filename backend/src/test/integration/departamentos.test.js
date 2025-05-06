const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app');

chai.use(chaiHttp);
chai.should();

describe('Departamentos', () => {

  describe('GET /departamentos', () => {
    it('debería obtener todos los departamentos', (done) => {
      chai.request(app)
        .get('/departamentos')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          if (res.body.length > 0) {
            expect(res.body[0]).to.have.property('id_departamento');
            expect(res.body[0]).to.have.property('nombre');
            expect(res.body[0]).to.have.property('descripcion');
            expect(res.body[0]).to.have.property('imagen');
          }
          done();
        });
    });
  });

  describe('POST /departamentos', () => {
    it('debería crear un nuevo departamento', (done) => {
      chai.request(app)
        .post('/departamentos')
        .send({
          nombre: 'Recursos Humanos',
          descripcion: 'Departamento de gestión de personal',
          imagen: 'rrhh.jpg'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Departamento creado');
          done();
        });
    });

    it('debería fallar por falta del campo nombre', (done) => {
      chai.request(app)
        .post('/departamentos')
        .send({
          descripcion: 'Sin nombre',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Falta campo: nombre');
          done();
        });
    });
  });

});
