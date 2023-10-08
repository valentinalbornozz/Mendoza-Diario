import Section from "../models/SectionModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

// Obtener todas las secciones
export const getSections = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Section.findAll({
        attributes: ["uuid", "code", "nombre", "image", "userId"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Section.findAll({
        attributes: ["uuid", "code", "nombre", "image", "userId"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una sección por ID
export const getSectionById = async (req, res) => {
  try {
    const section = await Section.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!section)
      return res.status(404).json({ message: "Sección no encontrada" });
    let response;
    if (req.role === "admin") {
      response = await Section.findOne({
        attributes: ["uuid", "code", "nombre", "image"],
        where: {
          id: section.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Section.findOne({
        attributes: ["uuid", "code", "nombre", "image"],
        where: {
          [Op.and]: [{ id: section.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva sección (solo para administradores)
export const createSection = async (req, res) => {
  try {
    if (!req.files || !req.files.image)
      return res
        .status(400)
        .json({ message: "No se ha subido la imagen de la sección" });

    const { code, nombre } = req.body;

    // Verifica que el usuario sea administrador
    if (req.role !== "admin") {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }

    // Obtén el ID del usuario autenticado (puede variar según tu implementación)
    const userId = req.userId; // Asegúrate de obtener el ID del usuario correctamente

    const existingSeccion = await Section.findOne({
      where: {
        code,
        nombre,
      },
    });

    if (existingSeccion) {
      // Si el autor ya existe, sugiere actualizarlo en lugar de crear uno nuevo
      return res.status(409).json({
        message:
          "La sección con ese codigo ya existe, considere actualizar el nombre si quiere usar ese mismo codigo en lugar de crear una nueva.",
      });
    }

    const imageFile = req.files.image; // El campo de imagen de la sección
    const imageExt = path.extname(imageFile.name).toLowerCase();
    const allowedTypes = [".png", ".jpg", ".jpeg", ".webp"];

    if (!allowedTypes.includes(imageExt))
      return res
        .status(422)
        .json({ message: "Imágenes de sección no válidas" });

    if (imageFile.size > 10000000)
      return res
        .status(422)
        .json({ message: "La imagen de sección debe tener menos de 10 MB" });

    const imageFileName = imageFile.md5 + imageExt;

    await Section.create({
      code,
      nombre,
      image: imageFileName, // Guarda la imagen de la sección en la base de datos
      userId,
    });

    imageFile.mv(`./public/images/${imageFileName}`, (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: "Sección creada con éxito" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una sección por ID (solo para administradores y propietarios)
export const updateSection = async (req, res) => {
  try {
    const section = await Section.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!section)
      return res.status(404).json({ message: "Sección no encontrada" });

    const { code, nombre } = req.body;

    // Verifica que el usuario sea administrador o el propietario de la sección
    if (req.role === "admin" || req.userId === section.userId) {
      let imageFileName = section.image;

      if (req.files !== null) {
        const imageFile = req.files.image;

        if (imageFile) {
          const imageExt = path.extname(imageFile.name).toLowerCase();
          const allowedTypes = [".png", ".jpg", ".jpeg", ".webp"];

          if (!allowedTypes.includes(imageExt))
            return res
              .status(422)
              .json({ message: "Imágenes de sección no válidas" });

          if (imageFile.size > 10000000)
            return res
              .status(422)
              .json({
                message: "La imagen de sección debe tener menos de 10 MB",
              });

          imageFileName = imageFile.md5 + imageExt;

          imageFile.mv(`./public/images/${imageFileName}`, (err) => {
            if (err) return res.status(500).json({ message: err.message });
          });
        }
      }

      await Section.update(
        {
          code,
          nombre,
          image: imageFileName, // Guarda el nombre del archivo de imagen en la base de datos
        },
        {
          where: {
            uuid: req.params.id,
          },
        }
      );

      res.status(200).json({ message: "Sección actualizada con éxito" });
    } else {
      res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una sección por ID (solo para administradores y propietarios)
export const deleteSection = async (req, res) => {
  try {
    const section = await Section.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!section)
      return res.status(404).json({ message: "Sección no encontrada" });

    // Verifica que el usuario sea administrador o el propietario de la sección
    if (req.role === "admin" || req.userId === section.userId) {
      // Eliminar la imagen asociada si existe
      const imageFileName = section.image;

      if (imageFileName) {
        const imageFilePath = `./public/images/${imageFileName}`;

        if (fs.existsSync(imageFilePath)) {
          fs.unlinkSync(imageFilePath);
        }
      }

      await Section.destroy({
        where: {
          uuid: req.params.id,
        },
      });
      res.status(200).json({ message: "Sección eliminada con éxito" });
    } else {
      res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
