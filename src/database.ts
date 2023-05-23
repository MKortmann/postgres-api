import dotenv from 'dotenv';
import { query } from 'express';
import { Pool } from 'pg';

dotenv.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

// client.query((err, res) => {
//   if(!err) {
//     console.log(res.rows);
//   } else {
//     console.log(err.message)
//   }
//   client.end;
// })
export default client;
