export const queryTextUsers = `CREATE TABLE IF NOT EXISTS
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

export const queryTextParty = ` 
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

export const queryTextOffice = `
CREATE TABLE IF NOT EXISTS
    offices(
      office_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
      type VARCHAR(128) NOT NULL,
      name VARCHAR(128) NOT NULL,
      createdBy INTEGER NOT NULL,
      createdOn VARCHAR(128) NOT NULL,
      FOREIGN KEY(createdBy) REFERENCES users(id) ON DELETE CASCADE 
    )`;

export const queryTextCandidate = `
CREATE TABLE IF NOT EXISTS
  candidates(
    politician_id SERIAL UNIQUE,
    office INTEGER REFERENCES offices(office_id),
    candidate INTEGER REFERENCES users(id),
    createdOn VARCHAR(128) NOT NULL,
    PRIMARY KEY (office, candidate) 
  )`;

export const queryTextVote = `
CREATE TABLE IF NOT EXISTS
  votes(
    vote_id SERIAL UNIQUE,
    office INTEGER REFERENCES offices(office_id),
    candidate INTEGER REFERENCES candidates(politician_id),
    voter INTEGER REFERENCES users(id), 
    createdOn VARCHAR(128) NOT NULL,
    PRIMARY KEY (office, voter) 
  );`;
