import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const Notices = db.define(
  "notice",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    subtitulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    portada: {
      type: DataTypes.STRING,
      url: DataTypes.STRING,
      allowNull: true, // Puede ser nulo si no se proporciona una imagen
    },
    image: {
      type: DataTypes.STRING,
      url: DataTypes.STRING,
      allowNull: true, // Puede ser nulo si no se proporciona una imagen
    },
    parrafos: {
      type: DataTypes.JSON, // JSON to store paragraphs
      allowNull: true,
    },
    etiquetas: {
      type: DataTypes.JSON, // JSON to store tags
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER, // Assuming 'userId' is the ID of the associated user
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    seccionId: {
      type: DataTypes.INTEGER, // Assuming 'seccionId' is the ID of the associated seccion
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    autorId: {
      type: DataTypes.INTEGER, // Assuming 'autorId' is the ID of the associated autor
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

Users.hasMany(Notices);
Notices.belongsTo(Users, { foreignKey: "userId" });

export default Notices;
