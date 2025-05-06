const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app');

chai.use(chaiHttp);
chai.should();

describe('Empleados', () => {
  // Creo un departamento para poder utilizarlo para crear el empleado
  before((done) => {
    chai.request(app)
      .post('/departamentos')
      .send({
        nombre: 'Contabilidad',
        descripcion: 'Departamento de finanzas',
        imagen: 'contabilidad.jpg'
      })
      .end((err, res) => {
        res.should.have.status(201);
        chai.request(app)
          .get('/departamentos')
          .end((err2, res2) => {
            const contabilidad = res2.body.find(d => d.nombre === 'Contabilidad');
            departamentoId = contabilidad?.id_departamento;
            done();
          });
      });
  });

  describe('GET /empleados', () => {
    it('debería obtener todos los empleados', (done) => {
      chai.request(app)
        .get('/empleados')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          if (res.body.length > 0) {
            expect(res.body[0]).to.have.property('id_empleado');
            expect(res.body[0]).to.have.property('nombre');
            expect(res.body[0]).to.have.property('dni');
            expect(res.body[0]).to.have.property('id_departamento');
          }
          done();
        });
    });
  });

  describe('POST /empleados', () => {
    it('debería crear un nuevo empleado', (done) => {
      chai.request(app)
        .post('/empleados')
        .send({
          nombre: 'Nerea Tomás',
          dni: '12345678A',
          id_departamento: departamentoId,
          telefono: '666777999',
          email: 'nerea@gmail.com'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Empleado creado');
          done();
        });
    });

    it('debería fallar por campos faltantes', (done) => {
      chai.request(app)
        .post('/empleados')
        .send({ dni: '11111111B' }) // Falta nombre e id_departamento
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').include('Faltan campos');
          done();
        });
    });
  });
});