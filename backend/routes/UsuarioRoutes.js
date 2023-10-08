import express from "express";
import {
  createUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarioById,
  updateUsuario,
} from "../controllers/Usuario.js";

const router = express.Router();

// Rutas para las funciones controladoras de usuarios
router.get("/usuarios", getUsuario);
router.get("/usuarios/:id", getUsuarioById);
router.post("/usuarios", createUsuario);
router.put("/usuarios/:id", updateUsuario);
router.delete("/usuarios/:id", deleteUsuario);

export default router;
