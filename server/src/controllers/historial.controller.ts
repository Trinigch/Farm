import { Request, Response } from "express";
import { getPool } from "../config/connection";

// Crear nuevo registro médico
export const crearHistorial = async (req: Request, res: Response) => {
  const { animal_id, fecha, diagnostico, tratamiento, veterinario, notas } = req.body;
  const pool = getPool();

  try {
    await pool.query(
      `INSERT INTO historial_medico (animal_id, fecha, diagnostico, tratamiento, veterinario, notas)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        animal_id,
        fecha ? new Date(fecha) : new Date(),
        diagnostico,
        tratamiento,
        veterinario,
        notas,
      ]
    );
    res.status(201).json({ message: "Historial médico agregado correctamente." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando historial médico." });
  }
};

// Obtener historial por animal
export const obtenerHistorialPorAnimal = async (req: Request, res: Response) => {
  const { animal_id } = req.params;
  const pool = getPool();

  try {
    const result = await pool.query(
      `SELECT * FROM historial_medico WHERE animal_id = $1 ORDER BY fecha DESC`,
      [Number(animal_id)]
    );
   
    if (result.rows.length === 0) {
    return res.status(404).json({ error: "Animal no encontrado" });
        }

     return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error obteniendo historial médico." });
  }
};

// Eliminar entrada del historial
export const eliminarHistorial = async (req: Request, res: Response) => {
  const { id } = req.params;
  const pool = getPool();

  try {
    await pool.query(`DELETE FROM historial_medico WHERE id = $1`, [id]);
    res.json({ message: "Registro de historial eliminado." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error eliminando registro." });
  }
};