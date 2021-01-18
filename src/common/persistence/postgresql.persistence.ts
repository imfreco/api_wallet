import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DBS_USER,
  host: process.env.DBS_HOST,
  database: process.env.DBS_NAME,
  password: process.env.DBS_PASS,
  port: +(process.env.DBS_PORT || 5433),
});

export default {
  query: (text: string, params: any) => pool.query(text, params),
};
