import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Notification from "../../../../components/notificacion/Notificacion.jsx";
import { imagenPorIdNoticia } from "../../../../service/imagen/Imagen.js";
import { listaNoticias } from "../../../../service/noticia/Principales.js";
import "./lista-noticias.css";
import Welcome from "../../../welcome/welcome.jsx";

function ListaNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [portadas, setPortadas] = useState();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleNotificationClose = () => {
    setShowNotification(false);
    setNotificationMessage("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noticiasData = await listaNoticias();
        setNoticias(noticiasData);
      } catch (error) {
        console.error("Error fetching noticias:", error);
      }
    };
    fetchData();
  }, [showNotification]); // Agrega showNotification como dependencia para actualizar la lista cuando cambie

  useEffect(() => {
    const cargarPortadas = async () => {
      const portadasPorNoticia = {};
      for (const noticia of noticias) {
        try {
          const portadaData = await imagenPorIdNoticia(noticia.id);
          portadasPorNoticia[noticia.id] = portadaData;
        } catch (error) {
          console.error(
            `Error al obtener la portada para la noticia ${noticia.id}:`,
            error
          );
        }
      }
      setPortadas(portadasPorNoticia);
    };
    cargarPortadas();
  }, [noticias]);

  const handleEliminarNoticia = (id) => {
    fetch(`http://localhost:8080/api/noticia/eliminar/${id}`, {
      method: "POST",
    })
      .then(async (response) => {
        if (response.ok) {
          const responseData = await response.text();
          setNotificationMessage(responseData);
          setShowNotification(true);
          setNoticias((prevAutores) =>
            prevAutores.filter((autor) => autor.id !== id)
          );
        } else {
          setNotificationMessage(
            "Error al eliminar la noticia. Response not ok: " +
              response.statusText
          );
          setShowNotification(true);
        }
      })
      .catch((error) => {
        setNotificationMessage(
          "Error al eliminar la noticia: " + error.message
        );
        setShowNotification(true);
      });
  };

  return (
    <div>
      <Welcome />
      <div className="lista-noticias-container">
        <table className="lista-noticias-table">
          <thead>
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Título</th>
              <th className="table-header">Portada</th>
              <th className="table-header">Seccion</th>
              <th className="table-header">Autor</th>
              <th className="table-header">Párrafos</th>
              <th className="table-header">Etiquetas</th>
              <th className="table-header">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {noticias.map((noticia) => (
              <tr key={noticia.id}>
                <td>{noticia.id}</td>
                <td>{noticia.titulo}</td>
                <td>
                  {noticia.portada && noticias[noticia.id] && (
                    <img
                      src={[portadas[noticia.id]]}
                      alt="Foto"
                      className="icono-image"
                    />
                  )}
                </td>
                <td>{noticia.seccion.nombre}</td>
                <td>
                  {noticia.autor.nombre} {noticia.autor.apellido}
                </td>
                <td>{noticia.parrafos.length}</td>
                <td>{noticia.etiquetas.length}</td>
                <td>
                  <button
                    className="eliminar-button"
                    onClick={() => handleEliminarNoticia(noticia.id)}
                  >
                    Eliminar
                  </button>
                  <Link to={`/administrador/noticia/editar/${noticia.id}`}>
                    <button className="eliminar-button">Editar</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showNotification && (
          <Notification
            message={notificationMessage}
            onClose={handleNotificationClose}
          />
        )}
      </div>
    </div>
  );
}

export default ListaNoticias;
