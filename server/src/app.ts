import express from 'express';
import cors from 'cors';
import path from 'path';
import animals from './routes/api/animals_routes'; 

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/animals',  animals ); 
// Servir los archivos estáticos del cliente React
app.use(express.static(path.join(__dirname, 'client')));

// Ruta catch-all para React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});
export default app;