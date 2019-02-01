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

let token;
let admintoken;

const party = {
  name: 'ADD',
  hqAddress: 'ikeja',
  logourl: 'google.com',
  createdOn: '1/31/2019',
};

const office = {
  type: 'ADD',
  name: 'ikeja',
  createdOn: '1/31/2019',
};

const form = {
  office: 'president',
  createdOn: '1/31/2019',
};

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

describe('Create a user with alphanumeric names', () => {
  it('Should return an error', (done) => {
    request.post('api/v1/auth/signup')
      .send({
        email: user.email,
        password: user.password,
        firstName: '900Users',
        lastName: '500 subscribers',
      })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body.error).to.equal('The firstName, lastName can not contain numbers');
        return done();
      });
    done();
  });
});

describe('Create a user without using string as password', () => {
  it('Should return an error', (done) => {
    const { email, firstName, lastName } = user;
    request.post('api/v1/auth/signup')
      .send({
        email, password: 78474567890, lastName, firstName,
      })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body.error).to.equal('Password needs to be a string');
      });
    done();
  });
});

describe('Create a user with an invalid email', () => {
  it('Should return an error', (done) => {
    const { password, firstName, lastName } = user;
    request.post('api/v1/auth/signup')
      .send({
        email: 'yony', password, lastName, firstName,
      })
      .end(async (error, response) => {
        await expect(response.status).to.equal(400);
        await expect(typeof (response.body)).to.equal('object');
        await expect(response.body.error).to.equal('The email is invalid');
        return done();
      });
    done();
  });
});

describe('POST api/v1/auth/signup', () => {
  it('should successfully create a user account if inputs are valid', (done) => {
    request.post('/api/v1/auth/signup')
      .send(userOne)
      .end((err, res) => {
        if (err) throw err;
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

describe('POST api/v1/auth/signup', () => {
  it('should return an error if signup inputs are invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send()
      .end((err, res) => {
        if (err) throw err;
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('should successfully log a user in if login inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userOne)
      .end((err, res) => {
        if (err) done();
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

describe('POST api/v1/auth/login', () => {
  it('should return an error if login inputs are empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.equal('email cannot be empty');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('should return an error if login password is wrong', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: user.username,
        password: '1fiuvjnmwcijnmk3wdc0',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.a('string');
        done();
      });
  });
});


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
        if (err) throw err;
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
        admintoken = body.data[0].token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        //expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
        expect(body.data[0].token).to.be.a('string');
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
        expect(body.data[0]).to.be.an('object');
        expect(body.message).to.be.a('string');
        expect(body.data[0]).to.haveOwnProperty('id' && 'name');
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
        if (err) throw err;
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
        expect(body.data[0]).to.haveOwnProperty('id' && 'name' && 'hqAddress' && 'logo');
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
        expect(body.status).to.be.equals(201);
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

// Register as Candidate
describe('POST api/v1/', () => {
  it('should create a record if user input is valid', (done) => {
    chai.request(app)
      .post('/office/2/register')
      .set({ 
        'x-access-token': token,
      })
      .send({
        office: '2',
        createdOn: '1/31/2019',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.equals(201);
        expect(body.data[0]).to.be.an('object');
        expect(body.message).to.be.a('string');
        expect(body.data[0]).to.haveOwnProperty('candidate' && 'office');
        done();
      });
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
