import express from "express";
import {
  obtenerAnimales,
  crearAnimal,
  actualizarAnimal,
  obtenerAnimalPorId,
  eliminarAnimal,
} from "../../controllers/animal.controller";

const router = express.Router();

router.get("/", obtenerAnimales);
router.post("/", crearAnimal);
router.put("/:id", actualizarAnimal);
router.get("/:id", obtenerAnimalPorId);
router.delete("/:id", eliminarAnimal);

export default router;