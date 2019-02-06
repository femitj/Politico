import { Client } from 'pg';
import dotenv from 'dotenv';
import {
  queryTextUsers, queryTextOffice,
  queryTextParty, queryTextVote, queryTextCandidate,
} from './table';

dotenv.config();

const client = new Client({
  connectionString: process.env.DB_URL_PROD || process.env.DATABASE_URL,
  ssl: true,
});


const creeateTables = async () => {
  await client.connect();
  await client.query(queryTextUsers);
  await client.query(queryTextParty);
  await client.query(queryTextOffice);
  await client.query(queryTextCandidate);
  await client.query(queryTextVote);
  await client.end();
  console.log('All created successfully');
  process.exit(0);
};

creeateTables();
