import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE,
  port: Number(process.env.PG_PORT) || 5432,
    ssl: {
    rejectUnauthorized: false, // permite conexión SSL con Render
  },
});

export const getPool = () => pool;