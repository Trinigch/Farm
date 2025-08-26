import express from 'express';
import cors from 'cors';
import path from 'path';
import animals from './routes/api/animals_routes'; 

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use('/api/animals',  animals ); 
// Servir los archivos estáticos del cliente React
app.use(express.static(path.join(__dirname, 'client')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

export default app;