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
    res.status(201).json({ message: 'Animal registrado correctamente.' });
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

export const actualizarAnimal = async (req: Request, res: Response):Promise<void>  => {
  const { id } = req.params;
  const { nombre, especie, breed, fecha_nacimiento, observaciones, padre_id, madre_id, estado } = req.body; // <-- incluir especie y estado
  const pool = getPool();

  try {
    const result = await pool.query(
      `UPDATE animales
       SET nombre = $1,
           especie = $2,
           breed = $3,
           fecha_nacimiento = $4,
           observaciones = $5,
           padre_id = $6,
           madre_id = $7,
           estado = $8,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *`, // <-- devolver el animal actualizado
      [
        nombre,
        especie,
        breed,
        fecha_nacimiento ? new Date(fecha_nacimiento) : null,
        observaciones,
        padre_id,
        madre_id,
        estado,
        id,
      ]
    );

    if (result.rows.length === 0) {
    res.status(404).json({ error: "Animal no encontrado" });
    }

    res.json(result.rows[0]); // <-- devolver el registro actualizado
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error actualizando el animal." });
  }
};

export const obtenerAnimalPorId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const pool = getPool();

  try {
    const result = await pool.query(`SELECT * FROM animales WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Animal no encontrado" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo el animal." });
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
