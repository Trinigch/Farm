
import { Router } from "express";
import { crearHistorial, obtenerHistorialPorAnimal, eliminarHistorial } from "../../controllers/historial.controller";

const router = Router();

router.post("/", crearHistorial); // agregar entrada
router.get("/:animal_id", obtenerHistorialPorAnimal); // historial de un animal
router.delete("/:id", eliminarHistorial); // eliminar entrada

export default router;