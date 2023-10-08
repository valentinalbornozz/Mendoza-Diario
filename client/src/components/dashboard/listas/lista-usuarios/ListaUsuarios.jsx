import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Notification from "../../../../components/notificacion/Notificacion.jsx";
import { imagenPorIdUsuario } from "../../../../service/imagen/Imagen.js";
import { listaUsuarios } from "../../../../service/usuario/Listar.js";
import Welcome from "../../../welcome/welcome.jsx";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [imagenes, setImagenes] = useState();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleNotificationClose = () => {
    setShowNotification(false);
    setNotificationMessage("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosData = await listaUsuarios();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    };
    fetchData();
  }, [showNotification]);

  useEffect(() => {
    // Cargar las imágenes por cada usuario
    const cargarImagenes = async () => {
      const imagenesPorUsuario = {};
      for (const usuario of usuarios) {
        try {
          const imagenData = await imagenPorIdUsuario(usuario.id);
          imagenesPorUsuario[usuario.id] = imagenData;
        } catch (error) {
          console.error(
            `Error al obtener la imagen para el usuario ${usuario.id}:`,
            error
          );
        }
      }
      setImagenes(imagenesPorUsuario);
    };

    cargarImagenes();
  }, [usuarios]);

  const handleEliminarUsuario = (id) => {
    fetch(`http://localhost:8080/api/usuario/eliminar/${id}`, {
      method: "POST",
    })
      .then(async (response) => {
        if (response.ok) {
          const responseData = await response.text();
          setNotificationMessage(responseData);
          setShowNotification(true);
          // Actualizar la lista de usuarios después de eliminar
          setUsuarios((prevUsuarios) =>
            prevUsuarios.filter((usuario) => usuario.id !== id)
          );
        } else {
          setNotificationMessage(
            "Error al eliminar el usuario. Response not ok: " +
              response.statusText
          );
          setShowNotification(true);
        }
      })
      .catch((error) => {
        setNotificationMessage(
          "Error al eliminar el usuario: " + error.message
        );
        setShowNotification(true);
      });
  };

  return (
    <div>
      <Welcome />
      <div className="lista-secciones-container">
        <table className="lista-secciones-table">
          <thead>
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Nombre</th>
              <th className="table-header">Apellido</th>
              <th className="table-header">Usuario</th>
              <th className="table-header">Rol</th>
              <th className="table-header">Email</th>
              <th className="table-header">Telefono</th>
              <th className="table-header">Imagen</th>
              <th className="table-header">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.nombreUsuario}</td>
                <td>{usuario.rol}</td>
                <td>{usuario.email}</td>
                <td>{usuario.telefono}</td>
                <td>
                  {usuario.imagen && imagenes[usuario.id] && (
                    <img
                      src={[imagenes[usuario.id]]}
                      alt="Icono"
                      className="icono-image"
                    />
                  )}
                </td>
                <td>
                  <button
                    className="eliminar-button"
                    onClick={() => handleEliminarUsuario(usuario.id)}
                  >
                    Eliminar
                  </button>
                  <Link to={`/administrador/usuario/editar/${usuario.id}`}>
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

export default ListaUsuarios;
