/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Notification from "../../../components/notificacion/Notificacion";
import { listaAutores } from "../../../service/autor/Listar.js";
import { listaSecciones } from "../../../service/seccion/Listar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import fetch from "node-fetch";
import { noticiaPorId } from "../../../service/noticia/Principales.js";

const EditarNoticia = ({ id }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [parrafos, setParrafos] = useState([""]);
  const [etiquetas, setEtiquetas] = useState([""]);
  const [idSeccion, setIdSeccion] = useState("");
  const [idAutor, setIdAutor] = useState("");
  const [portada, setPortada] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [autores, setAutores] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleNuevoParrafoChange = (e, index) => {
    const updatedParrafos = [...parrafos];
    updatedParrafos[index] = e.target.value;
    setParrafos(updatedParrafos);
  };

  const handleAgregarParrafo = () => {
    setParrafos([...parrafos, ""]);
  };

  const handleNuevaEtiquetaChange = (e, index) => {
    const updatedEtiquetas = [...etiquetas];
    updatedEtiquetas[index] = e.target.value;
    setEtiquetas(updatedEtiquetas);
  };

  const handleAgregarEtiqueta = () => {
    setEtiquetas([...etiquetas, ""]);
  };

  const handleEliminarParrafo = (index) => {
    const updatedParrafos = [...parrafos];
    updatedParrafos.splice(index, 1);
    setParrafos(updatedParrafos);
  };

  const handleEliminarEtiqueta = (index) => {
    const updatedEtiquetas = [...etiquetas];
    updatedEtiquetas.splice(index, 1);
    setEtiquetas(updatedEtiquetas);
  };

  const handlePortadaChange = (e) => {
    try {
      setPortada(e.target.files[0]);
    } catch (error) {
      console.error("Error al actualizar la portada:", error);
    }
  };

  const handleImagenesChange = (e) => {
    try {
      const newImages = [...imagenes];
      newImages.push(e.target.files[0]);
      setImagenes(newImages);
    } catch (error) {
      console.error("Error al actualizar las imágenes:", error);
    }
  };

  const handleSeccionChange = (e) => {
    setIdSeccion(e.target.value);
  };

  const handleAutorChange = (e) => {
    setIdAutor(e.target.value);
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
    setNotificationMessage("");
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("titulo", data.titulo);
    formData.append("subtitulo", data.subtitulo);
    formData.append("idSeccion", idSeccion); // Using idSeccion
    formData.append("idAutor", idAutor); // Using idAutor
    formData.append("portada", portada);
    imagenes.forEach((imagen, index) => {
      formData.append("imagenes", imagen);
    });
    formData.append("parrafos", JSON.stringify(parrafos));
    formData.append("etiquetas", JSON.stringify(etiquetas));

    try {
      const response = await fetch(
        `http://localhost:8080/api/noticia/editar/${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.text();
        setNotificationMessage(data);
        setShowNotification(true);
      } else {
        setNotificationMessage(
          "Error al enviar el formulario. Response not ok: " +
            response.statusText
        );
        setShowNotification(true);
      }
    } catch (error) {
      setNotificationMessage("Error al enviar el formulario: " + error.message);
      setShowNotification(true);
    }
  };

  useEffect(() => {
    listaAutores()
      .then((data) => setAutores(data))
      .catch((error) =>
        console.error("Error al obtener la lista de autores: ", error)
      );

    listaSecciones()
      .then((data) => setSecciones(data))
      .catch((error) =>
        console.error("Error al obtener la lista de secciones: ", error)
      );

    noticiaPorId(id)
      .then((noticia) => {
        setTitulo(noticia.titulo);
        setSubtitulo(noticia.subtitulo);
        setIdSeccion(noticia.idSeccion);
        setIdAutor(noticia.idAutor);
        setPortada(noticia.portada);
        setImagenes(noticia.imagenes);
        setParrafos(noticia.parrafos);
        setEtiquetas(noticia.etiquetas);
      })
      .catch((error) =>
        console.error("Error al obtener la noticia para editar: ", error)
      );
  }, [id, setValue]);

  return (
    <section className="flexCT">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <span className="titulo">Editar Noticia</span>

          <div>
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              {...register("titulo", {
                required: "Por favor, completa este campo.",
              })}
              className="input"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            {errors.titulo && (
              <span className="error-msg">{errors.titulo.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="subtitulo">Subtítulo</label>
            <input
              type="text"
              id="subtitulo"
              {...register("subtitulo", {
                required: "Por favor, completa este campo.",
              })}
              className="input"
              value={subtitulo}
              onChange={(e) => setSubtitulo(e.target.value)}
            />
            {errors.subtitulo && (
              <span className="error-msg">{errors.subtitulo.message}</span>
            )}
          </div>

          <div>
            <label className="cargar-archivo input" htmlFor="portada">
              <div className="icono">
                <FontAwesomeIcon icon={faFileImage} />
              </div>
              <div className="texto">
                <span>Subir portada</span>
              </div>
            </label>
            <input type="file" id="portada" onChange={handlePortadaChange} />

            {errors.portada && (
              <span className="error-msg">{errors.portada.message}</span>
            )}
          </div>

          <div>
            <label className="cargar-archivo input" htmlFor="imagenes">
              <div className="icono">
                <FontAwesomeIcon icon={faFileImage} />
              </div>
              <div className="texto">
                <span>Imagenes extra</span>
              </div>
            </label>
            <input
              type="file"
              id="imagenes"
              onChange={handleImagenesChange}
              multiple
            />
            {errors.imagenes && (
              <span className="error-msg">{errors.imagenes.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="seccion">Seleccionar Sección:</label>
            <select
              id="seccion"
              {...register("seccion", {
                required: "Por favor, selecciona una sección.",
              })}
              value={idSeccion}
              onChange={handleSeccionChange}
              className="input"
            >
              <option value="">Seleccionar Sección</option>
              {secciones.map((seccion) => (
                <option key={seccion.id} value={seccion.id}>
                  {seccion.nombre}
                </option>
              ))}
            </select>
            {errors.seccion && (
              <span className="error-msg">{errors.seccion.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="autor">Seleccionar Autor:</label>
            <select
              id="autor"
              {...register("autor", {
                required: "Por favor, selecciona un autor.",
              })}
              value={idAutor}
              onChange={handleAutorChange}
              className="input"
            >
              <option value="">Seleccionar Autor</option>
              {autores.map((autor) => (
                <option key={autor.id} value={autor.id}>
                  {autor.nombre}
                </option>
              ))}
            </select>
            {errors.autor && (
              <span className="error-msg">{errors.autor.message}</span>
            )}
          </div>

          <div>
            <label>Parrafos:</label>
            {parrafos.map((parrafo, index) => (
              <div key={index}>
                <textarea
                  value={parrafo}
                  onChange={(e) => handleNuevoParrafoChange(e, index)}
                  placeholder="Ingrese un párrafo"
                  className="textarea"
                  id="parrafo"
                />
                <button
                  type="button"
                  className="eliminar-parrafo-button"
                  onClick={() => handleEliminarParrafo(index)}
                >
                  Eliminar Párrafo
                </button>
              </div>
            ))}
            <button
              type="button"
              className="agregar-parrafo-button"
              onClick={handleAgregarParrafo}
            >
              Agregar Párrafo
            </button>
          </div>

          <div>
            <label>Etiquetas:</label>
            {etiquetas.map((etiqueta, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={etiqueta}
                  onChange={(e) => handleNuevaEtiquetaChange(e, index)}
                  placeholder="Ingrese una etiqueta"
                  className="textarea"
                  id="etiqueta"
                />
                <button
                  type="button"
                  className="eliminar-etiqueta-button"
                  onClick={() => handleEliminarEtiqueta(index)}
                >
                  Eliminar Etiqueta
                </button>
              </div>
            ))}
            <button
              type="button"
              className="agregar-etiqueta-button"
              onClick={handleAgregarEtiqueta}
            >
              Agregar Etiqueta
            </button>
          </div>

          <div className="button-container">
            <button type="submit" className="send-button">
              Guardar Noticia
            </button>
            <div className="reset-button-container">
              <button id="reset-btn" className="reset-button" type="reset">
                Resetear
              </button>
            </div>
          </div>
        </form>
      </div>
      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={handleNotificationClose}
        />
      )}
    </section>
  );
};

export default EditarNoticia;
