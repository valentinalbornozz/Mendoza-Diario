import Notices from "../models/NoticiaModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

// Obtener todas las noticias
export const getNotice = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Notices.findAll({
        attributes: [
          "uuid",
          "titulo",
          "subtitulo",
          "portada",
          "parrafos",
          "etiquetas",
          "userId",
          "seccionId",
          "autorId",
        ],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Notices.findAll({
        attributes: [
          "uuid",
          "titulo",
          "subtitulo",
          "portada",
          "parrafos",
          "etiquetas",
          "userId",
          "seccionId",
          "autorId",
        ],
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

// Obtener una noticia por ID
export const getNoticeById = async (req, res) => {
  try {
    const notice = await Notices.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!notice)
      return res.status(404).json({ message: "Noticia no encontrada" });
    let response;
    if (req.role === "admin") {
      response = await Notices.findOne({
        attributes: [
          "uuid",
          "titulo",
          "subtitulo",
          "portada",
          "parrafos",
          "etiquetas",
        ],
        where: {
          id: notice.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Notices.findOne({
        attributes: [
          "uuid",
          "titulo",
          "subtitulo",
          "portada",
          "parrafos",
          "etiquetas",
        ],
        where: {
          [Op.and]: [{ id: notice.id }, { userId: req.userId }],
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

// Crear una nueva noticia
export const createNotice = async (req, res) => {
  try {
    if (!req.files || !req.files.portada)
      return res
        .status(400)
        .json({
          message: "No se ha subido la imagen de portada o imagen extra",
        });

    const { titulo, subtitulo, parrafos, etiquetas, seccionId, autorId } =
      req.body;
    // Obtén el ID del usuario autenticado (puede variar según tu implementación)
    const userId = req.userId; // Asegúrate de obtener el ID del usuario correctamente

    const portadaFile = req.files.portada; // El campo de portada de la noticia
    const ext = path.extname(portadaFile.name).toLowerCase();
    const allowedTypes = [".png", ".jpg", ".jpeg"];

    if (!allowedTypes.includes(ext))
      return res
        .status(422)
        .json({ message: "Imágenes de portada no válidas" });

    if (portadaFile.size > 5000000)
      // Se cambió de 5MB
      return res
        .status(422)
        .json({ message: "La imagen de portada debe tener menos de 5 MB" });

    const portadaFileName = portadaFile.md5 + ext;

    const imageFile = req.files.image; // El campo de imagen extra de la noticia
    const imageExt = path.extname(imageFile.name).toLowerCase();
    const AllowedType = [".png", ".jpg", ".jpeg", "webp"];

    if (!AllowedType.includes(imageExt))
      return res.status(422).json({ message: "Imágenes extras no válidas" });

    if (imageFile.size > 5000000)
      return res
        .status(422)
        .json({ message: "La imagen extra debe tener menos de 5 MB" });

    const imageFileName = imageFile.md5 + imageExt;

    await Notices.create({
      titulo,
      subtitulo,
      portada: portadaFileName,
      parrafos,
      etiquetas,
      userId,
      seccionId,
      autorId,
      image: imageFileName, // Guarda la imagen extra en la base de datos
    });

    portadaFile.mv(
      `./public/images/${portadaFileName}`,
      imageFile.mv(`./public/images/${imageFileName}`, (err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: "Noticia creada con éxito" });
      })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una noticia por ID
export const updateNotice = async (req, res) => {
  try {
    const notice = await Notices.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!notice)
      return res.status(404).json({ message: "Noticia no encontrada" });

    const { titulo, subtitulo, parrafos, etiquetas, seccionId, autorId } =
      req.body;

    if (req.role === "admin" || req.userId === notice.userId) {
      let portadaFileName = notice.portada;
      let imageFileName = notice.image; // Cambio de nombre a "image"

      if (req.files !== null) {
        const portadaFile = req.files.portada;

        if (portadaFile) {
          const ext = path.extname(portadaFile.name).toLowerCase();
          const allowedTypes = [".png", ".jpg", ".jpeg"];

          if (!allowedTypes.includes(ext))
            return res
              .status(422)
              .json({ message: "Imágenes de portada no válidas" });

          if (portadaFile.size > 10000000)
            return res
              .status(422)
              .json({
                message: "La imagen de portada debe tener menos de 10 MB",
              });

          portadaFileName = portadaFile.md5 + ext;

          portadaFile.mv(`./public/images/${portadaFileName}`, (err) => {
            if (err) return res.status(500).json({ message: err.message });
          });
        }

        const imageFile = req.files.image; // El campo de imagen extra de la noticia

        if (imageFile) {
          const imageExt = path.extname(imageFile.name).toLowerCase();
          const imageAllowedTypes = [".png", ".jpg", ".jpeg", "webp"];

          if (!imageAllowedTypes.includes(imageExt))
            return res
              .status(422)
              .json({ message: "Imágenes extras no válidas" });

          if (imageFile.size > 10000000)
            return res
              .status(422)
              .json({ message: "La imagen extra debe tener menos de 10 MB" });

          imageFileName = imageFile.md5 + imageExt;

          imageFile.mv(`./public/images/${imageFileName}`, (err) => {
            if (err) return res.status(500).json({ message: err.message });
          });
        }
      }

      await Notices.update(
        {
          titulo,
          subtitulo,
          portada: portadaFileName,
          parrafos,
          etiquetas,
          seccionId,
          autorId,
          image: imageFileName, // Guarda el nombre del archivo de imagen extra en la base de datos
        },
        {
          where: {
            uuid: req.params.id,
          },
        }
      );

      res.status(200).json({ message: "Noticia actualizada con éxito" });
    } else {
      res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una noticia por ID
export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notices.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!notice)
      return res.status(404).json({ message: "Noticia no encontrada" });
    if (req.role === "admin" || req.userId === notice.userId) {
      // Eliminar imágenes asociadas si existen
      const imageFileName = notice.image; // Cambio de nombre a "image"

      if (imageFileName) {
        const imageFilePath = `./public/images/${imageFileName}`;

        if (fs.existsSync(imageFilePath)) {
          fs.unlinkSync(imageFilePath);
        }
      }

      // Eliminar la imagen de portada
      const portadaFileName = notice.portada;
      const portadaFilePath = `./public/images/${portadaFileName}`;

      if (fs.existsSync(portadaFilePath)) {
        fs.unlinkSync(portadaFilePath);
      }

      await Notices.destroy({
        where: {
          uuid: req.params.id,
        },
      });
      res.status(200).json({ message: "Noticia eliminada con éxito" });
    } else {
      res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
