import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faUpload } from "@fortawesome/free-solid-svg-icons"; // Importa los íconos que necesitas
import "./formulario.css";

const CargarNoticia = () => {
  return (
    <section className="flexCT">
      <div className="form-container">
        <form className="form">
          <span className="titulo">Cargar Noticia</span>

          <div>
            <label htmlFor="titulo">Título</label>
            <input type="text" id="titulo" name="titulo" className="input" />
          </div>

          <div>
            <label htmlFor="subtitulo">Subtítulo</label>
            <input
              type="text"
              id="subtitulo"
              name="subtitulo"
              className="input"
            />
          </div>

          <div>
            <label className="cargar-archivo input" htmlFor="portada">
              <div className="icono">
                <FontAwesomeIcon icon={faUpload} />{" "}
                {/* Icono de carga de portada */}
              </div>
              <div className="texto">
                <span>Subir portada</span>
              </div>
              <input type="file" id="portada" name="portada" />
            </label>
          </div>

          <div>
            <label className="cargar-archivo input" htmlFor="imagenes">
              <div className="icono">
                <FontAwesomeIcon icon={faFileImage} />{" "}
                {/* Icono de carga de imágenes */}
              </div>
              <div className="texto">
                <span>Imagenes extra</span>
              </div>
              <input type="file" id="imagenes" name="imagenes" multiple />
            </label>
          </div>

          <div>
            <label htmlFor="seccion">Seleccionar Sección:</label>
            <select id="seccion" name="seccion" className="input">
              <option value="">Seleccionar Sección</option>
              {/* Opciones de sección */}
            </select>
          </div>

          <div>
            <label htmlFor="autor">Seleccionar Autor:</label>
            <select id="autor" name="autor" className="input">
              <option value="">Seleccionar Autor</option>
              {/* Opciones de autor */}
            </select>
          </div>

          <div>
            <label>Parrafos:</label>
            <div>
              <textarea
                placeholder="Ingrese un párrafo"
                className="textarea"
                id="parrafo"
                name="parrafo"
              ></textarea>
              <button type="button" className="eliminar-parrafo-button">
                Eliminar Párrafo
              </button>
            </div>
            <button type="button" className="agregar-parrafo-button">
              Agregar Párrafo
            </button>
          </div>

          <div>
            <label>Etiquetas:</label>
            <div>
              <input
                type="text"
                placeholder="Ingrese una etiqueta"
                className="textarea"
                id="etiqueta"
                name="etiqueta"
              />
              <button type="button" className="eliminar-etiqueta-button">
                Eliminar Etiqueta
              </button>
            </div>
            <button type="button" className="agregar-etiqueta-button">
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
    </section>
  );
};

export default CargarNoticia;
