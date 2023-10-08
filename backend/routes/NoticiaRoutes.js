import express from "express";
import {
  createNotice,
  deleteNotice,
  getNotice,
  getNoticeById,
  updateNotice,
} from "../controllers/Noticia.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

// Rutas para las funciones controladoras
router.get("/notices", verifyUser, getNotice);
router.get("/notices/:id", verifyUser, getNoticeById);
router.post("/notices", verifyUser, createNotice);
router.patch("/notices/:id", verifyUser, updateNotice);
router.delete("/notices/:id", verifyUser, deleteNotice);

export default router;
