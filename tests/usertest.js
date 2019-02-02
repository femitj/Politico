/* eslint-disable no-undef */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../src/server';

const { expect } = chai;
const request = supertest(app);

chai.use(chaiHttp);

const userOne = {
  email: 'tijani@gmail.com',
  password: '12345678',
  firstname: 'Bayo',
  lastname: 'Tijani',
  othername: 'sule',
  phonenumber: '08052939416',
  passportUrl: 'fesyib',
};

let token;

// authentication routes tests

describe('Create a user without any value', () => {
  it('Should return an error', (done) => {
    request.post('api/v1/auth/signup')
      .send({})
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(typeof (response.body)).to.equal('object');
      });
    done();
  });
});


describe('POST api/v1/auth/signup', () => {
  it('should successfully create a user account if inputs are valid', (done) => {
    request.post('/api/v1/auth/signup')
      .send(userOne)
      .end((err, res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(201);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
        expect(body.data[0].token).to.be.a('string');
        done();
      });
  });
});


describe('POST api/v1/auth/login', () => {
  it('should successfully log a user in if login inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'tijani@gmail.com',
        password: '12345678',
      })
      .end((err, res) => {
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        token = body.data[0].token;
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

describe('Create a user without any value', () => {
  it('Should return an error', (done) => {
    request.post('api/v1/auth/login')
      .send({})
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(typeof (response.body)).to.equal('object');
      });
    done();
  });
});

// Test for vote
describe('POST api/v1/votes', () => {
  it('should vote', (done) => {
    chai.request(app)
      .post('/api/v1/votes/')
      .set({ 'x-access-token': token })
      .send({
        office: '2',
        candidate: '1',
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
        done();
      });
  });
});
