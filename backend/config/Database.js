import { Sequelize } from "sequelize";

const db = new Sequelize("noticias", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// Verificar la conexión a la base de datos
db.authenticate()
  .then(() => {
    console.log("Database connection established.");
  })
  .catch((error) => {
    console.error("Error connecting to the database: ", error);
  });

export default db;
