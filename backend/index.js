import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import FileUpload from "express-fileupload";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
// Importamos las rutas
import AutorRoutes from "./routes/AutorRoutes.js";
import NoticiaRoutes from "./routes/NoticiaRoutes.js";
import SectionRoutes from "./routes/SectionRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import UsuarioRoutes from "./routes/UsuarioRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
//   console.log("Los modelos se han sincronizado correctamente");
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
// Habilita el middleware CORS para permitir solicitudes desde otros dominios
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
// Parsea el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

//Rutas
app.use(UserRoutes);
app.use(AuthRoutes);
app.use(UsuarioRoutes);
app.use(SectionRoutes);
app.use(NoticiaRoutes);
app.use(AutorRoutes);

// try {
//   await store.sync();
//   console.log("Sincronización de la tienda de sesiones exitosa.");
// } catch (error) {
//   console.error("Error al sincronizar la tienda de sesiones:", error);
// }

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running..." + process.env.APP_PORT);
});
