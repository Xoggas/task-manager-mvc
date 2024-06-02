import pg from 'pg';

const { Client } = pg;

let client;

async function connect() {
  client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });

  await client.connect();
}

async function query(query, params) {
  return await client.query(query, params);
}

async function disconnect() {
  await client.end();
}

export default {
  connect,
  query,
  disconnect
};