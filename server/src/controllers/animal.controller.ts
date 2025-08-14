import { Request, Response } from 'express';
import { getPool } from '../config/connection';

export const crearAnimal = async (req: Request, res: Response) => {
  const { nombre, especie, breed, fecha_nacimiento, padre_id, madre_id, estado, observaciones } = req.body;
  const pool = getPool();

  try {
    await pool.query(
      `INSERT INTO animales 
        (nombre, especie, breed, fecha_nacimiento, padre_id, madre_id, estado, observaciones)
       VALUES  
        ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        nombre,
        especie,
        breed,
        fecha_nacimiento ? new Date(fecha_nacimiento) : null,
        padre_id,
        madre_id,
        estado,
        observaciones,
      ]
    );
    res.status(200).json({ message: 'Animal registrado correctamente.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error registrando el animal.' });
  }
};

export const obtenerAnimales = async (_req: Request, res: Response) => {
  const pool = getPool();

  try {
    const result = await pool.query(`SELECT * FROM animales`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo los animales." });
  }
};
export const actualizarAnimal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, breed, fecha_nacimiento, observaciones, padre_id, madre_id } = req.body;
  const pool = getPool();

  try {
    await pool.query(
      `UPDATE animales
       SET nombre = $1,
           breed=$2,
           fecha_nacimiento = $3,
           observaciones = $4,
           padre_id = $5,
           madre_id = $6,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7`,
      [
        nombre,
        breed ,
        fecha_nacimiento ? new Date(fecha_nacimiento) : null,
        observaciones,
        padre_id,   // aquí padre_id puede ser número o null
        madre_id,   // aquí madre_id puede ser número o null
        id,
      ]
    );
    res.json({ message: "Animal actualizado." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error actualizando el animal." });
  }
};

export const eliminarAnimal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const pool = getPool();

  try {
    await pool.query(`DELETE FROM animales WHERE id = $1`, [id]);
    res.json({ message: "Animal eliminado." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error eliminando el animal." });
  }
};