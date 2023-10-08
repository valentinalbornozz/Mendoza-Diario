import express from "express";
import {
  createSection,
  deleteSection,
  updateSection,
  getSections,
  getSectionById,
} from "../controllers/section.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

// Rutas para las funciones controladoras de secciones
router.get("/sections", verifyUser, getSections);
router.get("/sections/:id", verifyUser, getSectionById);
router.post("/sections", verifyUser, createSection);
router.patch("/sections/:id", verifyUser, updateSection);
router.delete("/sections/:id", verifyUser, deleteSection);

export default router;
