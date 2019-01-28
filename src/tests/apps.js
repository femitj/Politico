import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

const newParty = {
  id: 1,
  createdOn: 'Mon Jan 25 2019',
  name: 'PDP', // String
  hqAddress: 'Senate House, Abuja', // String 
  logoUrl: 'google.com', // String
};

const nameUpdateTo = {
  name: 'CCP',
};

const newOffice = {
  id: 1,
  createdOn: 'Fri Jan 25 2019',
  type: 'local government', // federal, legislative, state, or local government
  name: 'LG chairman', // Office name
  };

describe('Politico Test Space', () => {
  describe('GET /political-party', () => {
    it('should list all parties', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('array');
          res.body.status.should.equal(200);
          done();
        });
    });
  });

  describe('GET /political-party/:id', () => {
    it('should return a specific party', (done) => {
      chai.request(app)
        .get('/api/v1/parties/1')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('array');
          res.body.status.should.equal(200);
          done();
        });
    });
  });

  describe('POST /political-party', () => {
    it('should create a party', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .send(newParty)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('array');
          res.body.status.should.equal(201);
          done();
        });
    });
  });

  describe('PATCH /party', () => {
    it("should edit a party's name", (done) => {
      chai.request(app)
        .patch('/api/v1/parties/1')
        .send(nameUpdateTo)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('array');
          res.body.status.should.equal(200);
          done();
        });
    });
  });

  describe('DELETE /political-party', () => {
    it('should delete a party', (done) => {
      chai.request(app)
        .delete('/api/v1/parties/1')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.be.a('number');
          res.body.should.have.property('message');
          res.body.status.should.equal(200);
          done();
        });
    });
  });

  describe('POST /political-office', () => {
    it('should create a office', (done) => {
      chai.request(app)
        .post('/api/v1/offices')
        .send(newOffice)
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('array');
          res.body.status.should.equal(201);
          done();
        });
    });
  });

  describe('GET /political-office', () => {
    it('should list all offices', (done) => {
      chai.request(app)
        .get('/api/v1/offices')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('array');
          res.body.status.should.equal(200);
          done();
        });
    });
  });

  describe('GET /political-office/:id', () => {
    it('should return a specific office', (done) => {
      chai.request(app)
        .get('/api/v1/offices/1')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('array');
          res.body.status.should.equal(200);
          done();
        });
    });
  });

});