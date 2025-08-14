DROP DATABASE IF EXISTS farm_db;
CREATE DATABASE farm_db;

CREATE TABLE animales (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  especie TEXT NOT NULL,
  fecha_nacimiento DATE,
  padre_id INTEGER,
  madre_id INTEGER,
  estado TEXT CHECK (estado IN ('alive', 'deceased', 'under treatment')) DEFAULT 'alive',
  observaciones TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
