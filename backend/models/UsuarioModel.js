import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Autor from "./AutorModel.js"; // Import the Autor model
import Noticias from "./NoticiaModel.js"; // Import the Noticias model
import Seccion from "./SectionModel.js"; // Import the Seccion model

const Usuario = db.define(
  "Usuario",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    imagen_id: {
      type: DataTypes.STRING,
      url: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [7, 20],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// Define the relationship between Usuario and Noticias (a user can have many noticias).
Usuario.hasMany(Noticias, { foreignKey: "userId" });

// Define the relationship between Usuario and Seccion (a user can have many secciones).
Usuario.hasMany(Seccion, { foreignKey: "userId" });

// Define the relationship between Usuario and Autor (a user can have many autores).
Usuario.hasMany(Autor, { foreignKey: "userId" });

export default Usuario;
