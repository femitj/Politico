/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

const { expect } = chai;

chai.use(chaiHttp);

const user = {
  email: 'admin@email.com',
  password: 'admin_pass',
  firstname: 'User',
  lastname: 'Admin',
  othername: '',
  phonenumber: '08057661075',
  passportUrl: 'google.com',
  isAdmin: true,
};

let admintoken;

const office = {
  type: 'ADD',
  name: 'ikeja',
  createdOn: '1/31/2019',
};

// Tests for Political Office
describe('POST api/v1/auth/login', () => {
  it('should successfully log a user in if login inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        admintoken = body.data[0].token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
        expect(body.data[0].token).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/offices', () => {
  it('should create office if user input is valid', (done) => {
    chai.request(app)
      .post('/api/v1/offices/')
      .set({ 'x-access-token': admintoken })
      .send(office)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(201);
        expect(body.data[0]).to.be.an('object');
        expect(body.message).to.be.a('string');
        expect(body.data[0]).to.haveOwnProperty('id' && 'name');
        done();
      });
  });
});

describe('POST api/v1/offices', () => {
  it('should create office', (done) => {
    chai.request(app)
      .post('/api/v1/offices/')
      .set({ 'x-access-token': admintoken })
      .send({
        type: 'Federal',
        name: 'President',
        createdOn: '1/31/2019',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(201);
        expect(body.data[0]).to.be.an('object');
        expect(body.message).to.be.a('string');
        expect(body.data[0]).to.haveOwnProperty('id' && 'name');
        done();
      });
  });
});


describe('GET api/v1/offices', () => {
  it('should return an empty array and status 200 if records are empty', (done) => {
    chai.request(app)
      .get('/api/v1/offices')
      .set({ 'x-access-token': admintoken })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        done();
      });
  });
});

describe('GET api/v1/offices/:id', () => {
  it('should return a office record with a specific id', (done) => {
    chai.request(app)
      .get('/api/v1/offices/1')
      .set({ 'x-access-token': admintoken })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('id' && 'name' && 'type');
        done();
      });
  });
});
