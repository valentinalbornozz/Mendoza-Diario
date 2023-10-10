import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faUpload } from "@fortawesome/free-solid-svg-icons";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [preview, setPreview] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [paragraphs, setParagraphs] = useState("");
  const [tags, setTags] = useState("");
  const [sections, setSections] = useState([]);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  const loadCoverImage = (e) => {
    const image = e.target.files[0];
    setCoverImage(image);
    setPreview(URL.createObjectURL(image));
  };

  const loadAdditionalImages = (e) => {
    const newImages = [...additionalImages];
    for (let i = 0; i < e.target.files.length; i++) {
      newImages.push(e.target.files[i]);
    }
    setAdditionalImages(newImages);
  };

  const saveNews = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("coverImage", coverImage);
    formData.append("sectionId", sectionId);
    formData.append("authorId", authorId);
    additionalImages.forEach((image, index) => {
      formData.append(`additionalImages[${index}]`, image);
    });
    formData.append("paragraphs", paragraphs);
    formData.append("tags", tags);

    try {
      await axios.post("http://localhost:3000/notices", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/sections")
      .then((response) => {
        const sectionsData = response.data;
        setSections(sectionsData);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/autor")
      .then((response) => {
        const authorsData = response.data;
        setAuthors(authorsData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className="flexCT">
      <div className="form-container">
        <form onSubmit={saveNews} className="form">
          <span className="titulo">Cargar Noticia</span>
          <label htmlFor="titulo" className="input">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <div>
            <label htmlFor="coverImage" className="cargar-archivo input">
              <div className="icono">
                <FontAwesomeIcon icon={faUpload} />
              </div>
              <div className="texto">
                <span>Subir portada</span>
              </div>
            </label>
            <input
              type="file"
              id="portada"
              name="portada"
              className="file-input"
              onChange={loadCoverImage}
              accept=".png, .jpg, .jpeg"
            />
            <label htmlFor="imagenes" className="cargar-archivo input">
              <div className="icono">
                <FontAwesomeIcon icon={faFileImage} />
              </div>
              <div className="texto">
                <span>Imágenes extra</span>
              </div>
            </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              id="imagenes"
              className="file-input"
              onChange={loadAdditionalImages}
              multiple
            />
          </div>
          {preview && (
            <div className="form-group">
              <label>Preview</label>
              <div className="control">
                <figure className="image is-128x128">
                  <img src={preview} alt="Preview Image" />
                </figure>
              </div>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="seccion">Section</label>
            <div className="control">
              <select
                className="select"
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}
              >
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Author</label>
            <div className="control">
              <select
                className="select"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
              >
                <option value="">Select Author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Paragraphs</label>
            <div className="control">
              <textarea
                className="textarea"
                value={paragraphs}
                onChange={(e) => setParagraphs(e.target.value)}
                placeholder="Add paragraphs separated by line breaks..."
              ></textarea>
            </div>
          </div>
          <div className="form-group">
            <label>Tags</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Add tags separated by commas..."
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="send-button">
              Save News
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNews;
