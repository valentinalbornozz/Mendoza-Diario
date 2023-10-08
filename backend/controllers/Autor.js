import Autor from "../models/AutorModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

// Obtener todas los autores
export const getAutor = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Autor.findAll({
        attributes: ["uuid", "nombre", "apellido", "image", "userId"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Autor.findAll({
        attributes: ["uuid", "nombre", "apellido", "image", "userId"],
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
export const getAutorById = async (req, res) => {
  try {
    const autor = await Autor.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!autor) return res.status(404).json({ message: "Autor no encontrada" });
    let response;
    if (req.role === "admin") {
      response = await Autor.findOne({
        attributes: ["uuid", "nombre", "apellido", "image"],
        where: {
          id: autor.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Autor.findOne({
        attributes: ["uuid", "nombre", "apellido", "image"],
        where: {
          [Op.and]: [{ id: autor.id }, { userId: req.userId }],
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

// Crear un nuevo autor
export const createAutor = async (req, res) => {
  try {
    if (!req.files || !req.files.image)
      return res
        .status(400)
        .json({ message: "No se ha subido la imagen del autor" });

    const { nombre, apellido } = req.body;

    // Verifica que el usuario sea administrador
    if (req.role !== "admin") {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }

    // Obtén el ID del usuario autenticado (puede variar según tu implementación)
    const userId = req.userId; // Asegúrate de obtener el ID del usuario correctamente

    const existingAutor = await Autor.findOne({
      where: {
        nombre,
        apellido,
      },
    });

    if (existingAutor) {
      // Si el autor ya existe, sugiere actualizarlo en lugar de crear uno nuevo
      return res.status(409).json({
        message:
          "El autor con estos nombres y apellidos ya existe. Considera actualizarlo en lugar de crear uno nuevo.",
      });
    }

    const imageFile = req.files.image; // El campo de imagen de la sección
    const imageExt = path.extname(imageFile.name).toLowerCase();
    const allowedTypes = [".png", ".jpg", ".jpeg", ".webp"];

    if (!allowedTypes.includes(imageExt))
      return res
        .status(422)
        .json({ message: "Imágenes de autores no válidas" });

    if (imageFile.size > 5000000)
      return res
        .status(422)
        .json({ message: "La imagen de sección debe tener menos de 5 MB" });

    const imageFileName = imageFile.md5 + imageExt;

    await Autor.create({
      nombre,
      apellido,
      image: imageFileName, // Guarda la imagen de la sección en la base de datos
      userId,
    });

    imageFile.mv(`./public/images/${imageFileName}`, (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: "Autor creado con éxito" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una sección por ID (solo para administradores y propietarios)
export const updateAutor = async (req, res) => {
  try {
    const autor = await Autor.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!autor) return res.status(404).json({ message: "Autor no encontrado" });

    const { nombre, apellido } = req.body;

    // Verifica que el usuario sea administrador o el propietario de la sección
    if (req.role === "admin" || req.userId === Autor.userId) {
      let imageFileName = autor.image;

      if (req.files !== null) {
        const imageFile = req.files.image;

        if (imageFile) {
          const imageExt = path.extname(imageFile.name).toLowerCase();
          const allowedTypes = [".png", ".jpg", ".jpeg", ".webp"];

          if (!allowedTypes.includes(imageExt))
            return res
              .status(422)
              .json({ message: "Imágenes de sección no válidas" });

          if (imageFile.size > 5000000)
            return res
              .status(422)
              .json({
                message: "La imagen de sección debe tener menos de 5 MB",
              });

          imageFileName = imageFile.md5 + imageExt;

          imageFile.mv(`./public/images/${imageFileName}`, (err) => {
            if (err) return res.status(500).json({ message: err.message });
          });
        }
      }

      await Autor.update(
        {
          nombre,
          apellido,
          image: imageFileName, // Guarda el nombre del archivo de imagen en la base de datos
        },
        {
          where: {
            uuid: req.params.id,
          },
        }
      );

      res.status(200).json({ message: "Autor actualizado con éxito" });
    } else {
      res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una sección por ID (solo para administradores y propietarios)
export const deleteAutor = async (req, res) => {
  try {
    const autor = await Autor.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!autor)
      return res.status(404).json({ message: "Sección no encontrada" });

    // Verifica que el usuario sea administrador o el propietario de la sección
    if (req.role === "admin" || req.userId === autor.userId) {
      // Eliminar la imagen asociada si existe
      const imageFileName = autor.image;

      if (imageFileName) {
        const imageFilePath = `./public/images/${imageFileName}`;

        if (fs.existsSync(imageFilePath)) {
          fs.unlinkSync(imageFilePath);
        }
      }

      await Autor.destroy({
        where: {
          uuid: req.params.id,
        },
      });
      res.status(200).json({ message: "Autor eliminado con éxito" });
    } else {
      res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
