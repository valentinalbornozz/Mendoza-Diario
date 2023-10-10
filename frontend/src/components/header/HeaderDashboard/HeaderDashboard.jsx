/* eslint-disable no-unused-vars */
import {
  faBars,
  faTimes,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HeadDash from "./headDashboard";
import { Button } from "react-bootstrap";
import "./HeaderStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../../Auth/authSlice.js";

export default function HeaderDashboard() {
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
      <HeadDash />
      <header>
        <div className="container">
          <nav>
            <ul
              className={navbar ? "navbar" : "flexCT"}
              onClick={() => setNavbar(false)}
            >
              <li>
                <NavLink to="/administrador/noticia/nueva">
                  Cargar Noticia
                </NavLink>
              </li>
              <li>
                <NavLink to="/administrador/noticia/listar">
                  Listar Noticias
                </NavLink>
              </li>
              <li>
                <NavLink to="/administrador/seccion/nueva">
                  Cargar Seccion
                </NavLink>
              </li>
              <li>
                <NavLink to="/administrador/seccion/listar">
                  Listar Secciones
                </NavLink>
              </li>
              <li>
                <NavLink to="/administrador/autor/nuevo">Cargar Autor</NavLink>
              </li>
              <li>
                <NavLink to="/administrador/autor/listar">
                  Listar Autores
                </NavLink>
              </li>

              <li>
                <NavLink to="/administrador/usuario/nuevo">
                  Cargar Usuario
                </NavLink>
              </li>
              <li>
                <NavLink to="/administrador/usuario/listar">
                  Listar Usuarios
                </NavLink>
              </li>
              <Button
                type="submit"
                onClick={logout}
                className="logout" // Desactivar el botón cuando está cargando
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                Logout
              </Button>
            </ul>
            <button className="barIco" onClick={() => setNavbar(!navbar)}>
              {navbar ? (
                <FontAwesomeIcon icon={faTimes} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </nav>
        </div>
      </header>
    </div>
  );
}
