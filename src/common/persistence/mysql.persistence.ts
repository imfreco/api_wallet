import { createPool } from 'mysql2/promise';

export default createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: +(process.env.DB_PORT || 3302),
  database: process.env.DB_NAME,
  decimalNumbers: true,
});
