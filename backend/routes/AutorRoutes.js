import express from "express";
import {
  createAutor,
  updateAutor,
  deleteAutor,
  getAutor,
  getAutorById,
} from "../controllers/Autor.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// Rutas para las funciones controladoras de autor
router.get("/autor", verifyUser, getAutor);
router.get("/autor/:id", verifyUser, getAutorById);
router.post("/autor", verifyUser, createAutor);
router.put("/autor/:id", verifyUser, updateAutor);
router.delete("/autor/:id", verifyUser, deleteAutor);

export default router;
