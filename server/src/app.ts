import express from 'express';
import cors from 'cors';
import path from 'path';
import animals from './routes/api/animals_routes'; 
import historialRoutes from "./routes/api/historial_routes";
const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || "https://farm-9og5.onrender.com";
console.log("process.env.FRONTEND_URL",process.env.FRONTEND_URL);

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



/************************************
const allowedOrigins = [
  "http://localhost:3000", // tu React en local
  "https://farm-9og5.onrender.com" // tu frontend en producción
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
*/
// importante: que Express también maneje OPTIONS
app.options("*", cors());

app.use(express.json());
app.use('/api/animals',  animals ); 
app.use("/api/historial", historialRoutes);
// Servir los archivos estáticos del cliente React
app.use(express.static(path.join(__dirname, 'client')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});





export default app;