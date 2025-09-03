import { Router, Request, Response } from "express";
import { getPool } from "../../config/connection";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { nombre, especie, estado, diagnostico, veterinario } = req.query;
  const pool = getPool();

  try {
    const conditions: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (nombre) {
      conditions.push(`a.nombre ILIKE $${idx++}`);
      values.push(`%${nombre}%`);
    }
    if (especie) {
      conditions.push(`a.especie ILIKE $${idx++}`);
      values.push(`%${especie}%`);
    }
    if (estado) {
      conditions.push(`a.estado = $${idx++}`);
      values.push(estado);
    }
    if (diagnostico) {
      conditions.push(`h.diagnostico ILIKE $${idx++}`);
      values.push(`%${diagnostico}%`);
    }
    if (veterinario) {
      conditions.push(`h.veterinario ILIKE $${idx++}`);
      values.push(`%${veterinario}%`);
    }

    let query = `
      SELECT a.id as animal_id, a.nombre, a.especie, a.estado, 
             h.id as historial_id, h.fecha, h.diagnostico, h.tratamiento, h.veterinario
      FROM animales a
      LEFT JOIN historial_medico h ON a.id = h.animal_id
    `;

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY a.id, h.fecha DESC";

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en búsqueda" });
  }
});

export default router;