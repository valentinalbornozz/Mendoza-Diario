import { Route, Routes as ReactDomRoutes } from "react-router-dom";
import CargarAutor from "../components/dashboard/formularios/CargarAutor.jsx";
import CargarNoticia from "../components/dashboard/formularios/CargarNoticia.jsx";
import CargarSeccion from "../components/dashboard/formularios/CargarSeccion.jsx";
import CargarUsuario from "../components/dashboard/formularios/CargarUsuario.jsx";
import EditarAutor from "../components/dashboard/formularios/EditarAutor.jsx";
import EditarNoticia from "../components/dashboard/formularios/EditarNoticia.jsx";
import EditarSeccion from "../components/dashboard/formularios/EditarSeccion.jsx";
import EditarUsuario from "../components/dashboard/formularios/EditarUsuario.jsx";
import "../components/dashboard/formularios/formulario.css";
import ListaAutores from "../components/dashboard/listas/lista-autores/ListaAutores.jsx";
import ListaNoticias from "../components/dashboard/listas/lista-noticias/ListaNoticias.jsx";
import ListaSecciones from "../components/dashboard/listas/lista-secciones/ListaSecciones.jsx";
import ListaUsuarios from "../components/dashboard/listas/lista-usuarios/ListaUsuarios.jsx";
import Footer from "../components/footer/Footer.jsx";
import HeaderDashboardAuth from "../components/header/HeaderAuth/HeaderDashboarAuth.jsx";
import Dashboard from "../pages/Dashboard/DashboardPage.jsx";

const AdminRoutes = () => {
  return (
    <layout>
      <HeaderDashboardAuth />
      <ReactDomRoutes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/noticia/nueva" element={<CargarNoticia />} />
        <Route path="/noticia/listar" element={<ListaNoticias />} />
        <Route path="/noticia/editar/:id" element={<EditarNoticia />} />
        <Route path="/seccion/nueva" element={<CargarSeccion />} />
        <Route path="/seccion/listar" element={<ListaSecciones />} />
        <Route path="/seccion/editar/:codigo" element={<EditarSeccion />} />
        <Route path="/autor/nuevo" element={<CargarAutor />} />
        <Route path="/autor/listar" element={<ListaAutores />} />
        <Route path="/autor/editar/:id" element={<EditarAutor />} />
        <Route path="/usuario/nuevo" element={<CargarUsuario />} />
        <Route path="/usuario/listar" element={<ListaUsuarios />} />
        <Route path="/usuario/editar/:id" element={<EditarUsuario />} />
      </ReactDomRoutes>
      <Footer />
    </layout>
  );
};

export default AdminRoutes;
