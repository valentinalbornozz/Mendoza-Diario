import { Route, Routes as ReactDomRoutes } from "react-router-dom";
import Footer from "../components/footer/Footer.jsx";
import Header from "../components/header/HeaderInicio/Header.jsx";
import AutorPage from "../pages/autorPage/AutorPage.jsx";
import Homepages from "../pages/home/Homepages.jsx";
import Privacidad from "../pages/privacidad/Privacidad.jsx";
import SeccionPage from "../pages/seccionpage/SeccionPage.jsx";
import SinglePage from "../pages/singlepage/SinglePage.jsx";
import LoginPage from "../pages/Login/Login.jsx";

const MainRoutes = () => {
  return (
    <layout>
      <Header />
      <ReactDomRoutes>
        <Route path="/" element={<Homepages />} />
        <Route path="/seccion/:seccion" element={<SeccionPage />} />
        <Route path="/noticia/:titulo" element={<SinglePage />} />
        <Route path="/autor/:autorName" element={<AutorPage />} />
        <Route path="/privacidad/politica" element={<Privacidad />} />
        <Route path="/login" element={<LoginPage />} />
      </ReactDomRoutes>
      <Footer />
    </layout>
  );
};

export default MainRoutes;
