import {
  faBars,
  faTimes,
  faSignOutAlt,
  faUpload,
  faDownload,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../../Auth/authSlice.js";
import "./HeaderStyleAuth.css";

export default function HeaderDashboardAuth() {
  const [navbar, setNavbar] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="full-header">
      <HeaderDashboardAuth />

      <header>
        <div className="container">
          <nav>
            <button className="barIco" onClick={() => setNavbar(!navbar)}>
              {navbar ? (
                <FontAwesomeIcon icon={faTimes} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>

            <ul className={navbar ? "navbar" : "flexCT"}>
              {user && user.role && (
                <div>
                  <li>
                    <NavLink to="/">
                      <FontAwesomeIcon icon={faHome} className="icon" /> Inicio
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/noticia/nueva">
                      <FontAwesomeIcon icon={faUpload} className="icon" />
                      Cargar Noticia
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/noticia/listar">
                      <FontAwesomeIcon icon={faDownload} className="icon" />
                      Listar Noticias
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/seccion/nueva">
                      <FontAwesomeIcon icon={faUpload} className="icon" />
                      Cargar Seccion
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/seccion/listar">
                      <FontAwesomeIcon icon={faDownload} className="icon" />
                      Listar Secciones
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/autor/nuevo">
                      <FontAwesomeIcon icon={faUpload} className="icon" />
                      Cargar Autor
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/autor/listar">
                      <FontAwesomeIcon icon={faDownload} className="icon" />
                      Listar Autores
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/usuario/nuevo">
                      <FontAwesomeIcon icon={faUpload} className="icon" />
                      Cargar Usuario
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/usuario/listar">
                      <FontAwesomeIcon icon={faDownload} className="icon" />
                      Listar Usuarios
                    </NavLink>
                  </li>
                </div>
              )}

              <li>
                <button onClick={logout} className="logout-button">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
