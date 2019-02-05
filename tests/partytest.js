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

const party = {
  name: 'APC',
  hqAddress: 'ikeja',
  logourl: 'google.com',
  createdOn: '1/31/2019',
};

// Testing endpoint for Political party
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
        //expect(body.status).to.be.equals(200);
        expect(body.data).to.haveOwnProperty('token');
        expect(body.data).to.haveOwnProperty('user');
        expect(body.data.user).to.be.an('object');
        expect(body.data.token).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/parties', () => {
  it('should create a record if user input is valid', (done) => {
    chai.request(app)
      .post('/api/v1/parties/')
      .set({ 'x-access-token': admintoken })
      .send(party)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(201);
        expect(body.data).to.be.an('object');
        expect(body.message).to.be.a('string');
        expect(body.data).to.haveOwnProperty('id' && 'name');
        done();
      });
  });
});


describe('GET api/v1/parties', () => {
  it('should return an empty array and status 200 if records are empty', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
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

describe('GET api/v1/parties/:id', () => {
  it('should return a party record with a specific id', (done) => {
    chai.request(app)
      .get('/api/v1/parties/1')
      .set({ 'x-access-token': admintoken })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data).to.haveOwnProperty('id' && 'name' && 'hqAddress' && 'logourl');
        done();
      });
  });
});

describe('PATCH api/v1/parties/:id/', () => {
  it('should edit the location value of a record if it exists', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/1')
      .set({ 'x-access-token': admintoken })
      .send({
        name: 'OOP',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('data');
        expect(body).to.haveOwnProperty('message');
        done();
      });
  });
});

describe('Delete api/v1/parties/:id/', () => {
  it('should delete a record by id if it exists', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/1')
      .set({ 'x-access-token': admintoken })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('message');
        done();
      });
  });
});
