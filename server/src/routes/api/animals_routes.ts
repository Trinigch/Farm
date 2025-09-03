import express from "express";
import { Request, Response } from "express";
import {
  obtenerAnimales,
  crearAnimal,
  actualizarAnimal,
  obtenerAnimalPorId,
  eliminarAnimal,
} from "../../controllers/animal.controller";

const router = express.Router();

// responder preflight para rutas con id
router.options("/:id", (_req:Request, res: Response ) => {
  res.sendStatus(200);
});
router.get("/", obtenerAnimales);
router.post("/", crearAnimal);
router.put("/:id", actualizarAnimal);
router.get("/:id", obtenerAnimalPorId);
router.delete("/:id", eliminarAnimal);

export default router;