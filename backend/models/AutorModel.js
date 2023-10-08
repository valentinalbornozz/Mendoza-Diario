import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

// Define el modelo de secciones
const Autores = db.define(
  "author",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Asegura que el código de la sección sea único
      validate: {
        notEmpty: true,
      },
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING,
      url: DataTypes.STRING,
      allowNull: true, // Puede ser nulo si no se proporciona una imagen
    },
    userId: {
      type: DataTypes.INTEGER,
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

// Establece la relación con la tabla de usuarios para obtener el userId
Users.hasMany(Autores);
Autores.belongsTo(Users, { foreignKey: "userId" });

export default Autores;
