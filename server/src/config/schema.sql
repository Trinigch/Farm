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


CREATE TABLE historial_medico (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER NOT NULL REFERENCES animales(id) ON DELETE CASCADE,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  diagnostico TEXT NOT NULL,
  tratamiento TEXT,
  veterinario TEXT,
  notas TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);