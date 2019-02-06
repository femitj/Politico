const { Pool } = require('pg');
const dontenv = require('dotenv');
const bcrypt = require('bcrypt');

dontenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL_PROD || process.env.DATABASE_URL,
  ssl: true,
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
        passportUrl VARCHAR(128),
        "isAdmin" BOOLEAN default FALSE
      )`;

  pool.query(queryTextUsers)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

const createAdmin = () => {
  const salt = bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hashSync('admin_pass', salt);

  const text = `INSERT INTO
    users(email, lastname, firstname, password, phoneNumber, passportUrl, "isAdmin") VALUES($1, $2, $3, $4, $5, $6, $7)`;
  const values = [
    'admin@email.com',
    'Admin',
    'User',
    hashedpassword,
    '08057661075',
    'google.com',
    true,
  ];
  pool.query(text, values)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

// Political party table
const createParty = () => {
  const queryTextParty = `
  CREATE TABLE IF NOT EXISTS
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
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

// Political office table
const createOffice = () => {
  const queryTextOffice = `
  CREATE TABLE IF NOT EXISTS
      offices(
        office_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
        type VARCHAR(128) NOT NULL,
        name VARCHAR(128) NOT NULL,
        createdBy INTEGER NOT NULL,
        createdOn VARCHAR(128) NOT NULL,
        FOREIGN KEY(createdBy) REFERENCES users(id) ON DELETE CASCADE 
      )`;

  pool.query(queryTextOffice)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

//  candidates table
const createCandidate = () => {
  const queryTextCandidate = `
  CREATE TABLE IF NOT EXISTS
      candidates(
        politician_id SERIAL UNIQUE,
        office INTEGER REFERENCES offices(office_id),
        candidate INTEGER REFERENCES users(id),
        createdOn VARCHAR(128) NOT NULL,
        PRIMARY KEY (office, candidate) 
      )`;

  pool.query(queryTextCandidate)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

//  votes table
const createVote = () => {
  const queryTextVote = `
  CREATE TABLE IF NOT EXISTS
      votes(
        vote_id SERIAL UNIQUE,
        office INTEGER REFERENCES offices(office_id),
        candidate INTEGER REFERENCES candidates(politician_id),
        voter INTEGER REFERENCES users(id), 
        createdOn VARCHAR(128) NOT NULL,
        PRIMARY KEY (office, voter) 
      )`;

  pool.query(queryTextVote)
    .then(() => {
      pool.end();
    })
    .catch(() => {
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
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

const createAllTables = () => {
  createParty();
  createOffice();
  createCandidate();
  createVote();
};

const dropAllTables = () => {
  dropUserTable();
};

module.exports = {
  createAllTables,
  createUserTable,
  createParty,
  createOffice,
  createCandidate,
  createVote,
  createResult,
  createAdmin,
  dropAllTables, 
};

require('make-runnable');