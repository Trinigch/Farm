import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE,
  port: Number(process.env.PG_PORT) || 5432,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});

export const getPool = () => pool;