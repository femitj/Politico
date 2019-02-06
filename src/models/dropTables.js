import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DB_URL_PROD || process.env.DATABASE_URL,
  ssl: true,
});

const creeateTables = async () => {
  await client.connect();
  await client.query('DROP TABLE IF EXISTS votes;');
  await client.query('DROP TABLE IF EXISTS candidates;');
  await client.query('DROP TABLE IF EXISTS offices;');
  await client.query('DROP TABLE IF EXISTS parties;');
  await client.query('DROP TABLE IF EXISTS users;');
  await client.end();
  console.log('All tables dropped successfully');
  process.exit(0);
};

creeateTables();
