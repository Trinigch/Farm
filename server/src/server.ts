import app from './app';
import { getPool } from './config/connection';

const PORT = process.env.PORT || 3001;
const pool = getPool();

pool.connect()
  .then((client) => {
    client.release();
    console.log('✅ Database connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error connecting to the database:', err);
  });
  