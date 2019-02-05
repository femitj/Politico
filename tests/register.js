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
        admintoken = body.data.token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data).to.haveOwnProperty('token');
        expect(body.data).to.haveOwnProperty('user');
        expect(body.data.user).to.be.an('object');
        expect(body.data.token).to.be.a('string');
        done();
      });
  });
});

// Register as Candidate
describe('POST api/v1/', () => {
  it('should be able to register as a candidate', (done) => {
    chai.request(app)
      .post('/api/v1/office/1/register')
      .set({
        'x-access-token': admintoken,
      })
      .send({
        office: '1',
        createdOn: '1/31/2019',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.equals(201);
        expect(body.data).to.be.an('object');
        expect(body.message).to.be.a('string');
        expect(body.data).to.haveOwnProperty('candidate' && 'office');
        done();
      });
  });
});
