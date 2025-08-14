import express from 'express';
import cors from 'cors';
import animals from './routes/api/animals_routes'; 

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/animals',  animals ); 

export default app;