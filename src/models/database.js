const { Pool } = require('pg');
const dontenv = require('dotenv');

dontenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('welcome to db');
});

// Users table
const createUserTable = () => {
  const queryTextUsers = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        firstname TEXT NOT NULL,
        lastname TEXT,
        othername TEXT,
        phoneNumber VARCHAR(128) NOT NULL,
        passportUrl VARCHAR(128) NOT NULL,
        "isAdmin" BOOLEAN default FALSE
      )`;

  pool.query(queryTextUsers)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

// Political party table
const createParty = () => {
  const queryTextParty =
    `CREATE TABLE IF NOT EXISTS
      parties(
        party_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
        name VARCHAR(128) NOT NULL,
        hqAddress VARCHAR(128) NOT NULL,
        logoUrl VARCHAR(128) NOT NULL,
        createdBy INTEGER NOT NULL,
        createdOn VARCHAR(128) NOT NULL,
        FOREIGN KEY(createdBy) REFERENCES users(id) ON DELETE CASCADE 
      )`;

  pool.query(queryTextParty)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

// Political office table
const createOffice = () => {
  const queryTextOffice =
    `CREATE TABLE IF NOT EXISTS
      offices(
        office_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
        type VARCHAR(128) NOT NULL,
        name VARCHAR(128) NOT NULL,
        createdBy INTEGER NOT NULL,
        createdOn VARCHAR(128) NOT NULL,
        FOREIGN KEY(createdBy) REFERENCES users(id) ON DELETE CASCADE 
      )`;

  pool.query(queryTextOffice)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
    }

//  candidates table
const createCandidate = () => {
  const queryTextCandidate =
    `CREATE TABLE IF NOT EXISTS
      candidates(
        politician_id INTEGER UNIQUE NOT NULL,
        office INTEGER UNIQUE REFERENCES offices(office_id),
        candidate INTEGER UNIQUE REFERENCES users(id),
        createdOn VARCHAR(128) NOT NULL,
        PRIMARY KEY (office, candidate) 
      )`;

  pool.query(queryTextCandidate)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
      
//  votes table
const createVote = () => {
  const queryTextVote =
    `CREATE TABLE IF NOT EXISTS
      votes(
        id INTEGER UNIQUE NOT NULL,
        office INTEGER UNIQUE REFERENCES offices(office_id),
        candidate INTEGER UNIQUE REFERENCES candidates(politician_id),
        voter INTEGER UNIQUE REFERENCES users(id), 
        createdOn VARCHAR(128) NOT NULL,
        CONSTRAINT pk PRIMARY KEY (office, voter) 
      )`;

  pool.query(queryTextVote)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

//  votes table
const createResult = () => {
  const queryTextResult =
    `CREATE TABLE IF NOT EXISTS
    results(
      id INTEGER UNIQUE NOT NULL,
      office INTEGER UNIQUE REFERENCES offices(office_id),
      candidate INTEGER UNIQUE REFERENCES candidates(politician_id),
      result INTEGER NOT NULL
    )`;
  
  pool.query(queryTextResult)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createAllTables = () => {
  createParty();
  createOffice();
  createCandidate();
  createVote();
};    

module.exports = {
  createAllTables,
  createUserTable,
  createParty,
  createOffice,
  createCandidate,
  createVote,
  createResult, 
};

require('make-runnable');