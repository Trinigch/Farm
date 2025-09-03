import app from './app';
import { getPool } from './config/connection';
import { PoolClient } from "pg"; // 👈 importante importar el tipo
const PORT = process.env.PORT || 3001;
const pool = getPool();

pool.connect()
  .then((client: PoolClient) => {
    client.release();
    console.log('✅ Database connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('❌ Error connecting to the database:', err);
  });
  