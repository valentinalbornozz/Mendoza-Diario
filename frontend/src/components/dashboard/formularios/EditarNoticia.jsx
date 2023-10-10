/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./formulario.css";

const CargarNoticia = () => {
  const [formValues, setFormValues] = useState({
    titulo: "",
    subtitulo: "",
    portada: null,
    imagenes: [],
    seccion: "",
    autor: "",
    parrafos: [],
    etiquetas: [],
  });

  const [secciones, setSecciones] = useState([]);
  const [autores, setAutores] = useState([]);
  const [error, setError] = useState(null);

  // useEffect para cargar opciones de sección y autor desde el backend
  useEffect(() => {
    // Hacer una solicitud GET al backend para obtener las opciones de sección y autor
    axios
      .get("http://localhost:3000/sections")
      .then((response) => {
        setSecciones(response.data.secciones);
      })
      .catch((error) => {
        setError("Error al cargar las opciones de sección.");
      });

    // Hacer una solicitud GET al backend para obtener las opciones de autor
    axios
      .get("http://localhost:3000/autor")
      .then((response) => {
        setAutores(response.data.autores);
      })
      .catch((error) => {
        setError("Error al cargar las opciones de autor.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "text") {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    } else if (type === "file") {
      setFormValues({
        ...formValues,
        [name]: files[0],
      });
    } else if (type === "select-one") {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("titulo", formValues.titulo);
      formData.append("subtitulo", formValues.subtitulo);
      formData.append("portada", formValues.portada);
      formData.append("seccionId", formValues.seccion);
      formData.append("autorId", formValues.autor);

      for (const imagen of formValues.imagenes) {
        formData.append("imagenes", imagen);
      }

      // Aquí puedes agregar la lógica para enviar los párrafos y etiquetas ingresados manualmente
      formData.append("parrafos", formValues.parrafos.join("\n"));
      formData.append("etiquetas", formValues.etiquetas.join(","));

      // Realizar una solicitud POST al backend para enviar los datos y crear la noticia
      await axios.post("/api/crear-noticia", formData);

      // Manejar éxito, redirigir o mostrar un mensaje de éxito, por ejemplo:
      alert("Noticia guardada con éxito");
      // Redirigir al usuario a la página de inicio o a donde desees
      // history.push("/");
    } catch (error) {
      setError("Error al guardar la noticia.");
    }
  };

  return (
    <section className="flexCT">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <span className="titulo">Cargar Noticia</span>

          <div>
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className="input"
              value={formValues.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="subtitulo">Subtítulo</label>
            <input
              type="text"
              id="subtitulo"
              name="subtitulo"
              className="input"
              value={formValues.subtitulo}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="cargar-archivo input" htmlFor="portada">
              <div className="icono">
                <FontAwesomeIcon icon={faUpload} />
              </div>
              <div className="texto">
                <span>Subir portada</span>
              </div>
              <input
                type="file"
                id="portada"
                name="portada"
                onChange={handleChange}
                accept=".png, .jpg, .jpeg"
                required
              />
            </label>
          </div>

          <div>
            <label className="cargar-archivo input" htmlFor="imagenes">
              <div className="icono">
                <FontAwesomeIcon icon={faFileImage} />
              </div>
              <div className="texto">
                <span>Imágenes extra</span>
              </div>
              <input
                type="file"
                id="imagenes"
                name="imagenes"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    imagenes: [...e.target.files],
                  })
                }
                accept=".png, .jpg, .jpeg"
                multiple
              />
            </label>
          </div>

          <div>
            <label htmlFor="seccion">Seleccionar Sección:</label>
            <select
              id="seccion"
              name="seccion"
              className="input"
              onChange={handleChange}
              value={formValues.seccion}
              required
            >
              <option value="">Seleccionar Sección</option>
              {secciones.map((seccion) => (
                <option key={seccion.id} value={seccion.id}>
                  {seccion.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="autor">Seleccionar Autor:</label>
            <select
              id="autor"
              name="autor"
              className="input"
              onChange={handleChange}
              value={formValues.autor}
              required
            >
              <option value="">Seleccionar Autor</option>
              {autores.map((autor) => (
                <option key={autor.id} value={autor.id}>
                  {autor.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="parrafos">Párrafos:</label>
            <textarea
              id="parrafos"
              name="parrafos"
              className="input"
              value={formValues.parrafos.join("\n")}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div>
            <label htmlFor="etiquetas">Etiquetas:</label>
            <input
              type="text"
              id="etiquetas"
              name="etiquetas"
              className="input"
              value={formValues.etiquetas.join(",")}
              onChange={handleChange}
            />
          </div>

          {error && <div className="error">{error}</div>}

          <div className="btn-container">
            <button type="submit" className="btn-guardar">
              Guardar Noticia
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CargarNoticia;
