export const obtenerImagen = (imagen) => {
    try {
        // Crear un Blob a partir de los datos de la imagen
        const blob = new Blob([imagen.contenido], { type: imagen.mime });

        // Crear una URL para la imagen
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// IMAGEN POR ID
export const imagenPorId = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/imagen/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la imagen por id. Response not ok.');
        }
        const data = await response.arrayBuffer();
        return data;
    } catch (error) {
        console.error('Error al obtener imagen por id: ', error);
        throw error;
    }
};

// IMAGEN POR ID NOTICIA
export const imagenPorIdNoticia = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/imagen/noticia/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la imagen por id de noticia. Response not ok.');
        }
        const data = await response.arrayBuffer();
        const imageUrl = URL.createObjectURL(new Blob([data]));
        return imageUrl;
    } catch (error) {
        console.error('Error al obtener imagen por id de noticia: ', error);
        throw error;
    }
};

// IMAGEN POR ID USUARIO
export const imagenPorIdUsuario = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/imagen/usuario/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la imagen por id de usuario. Response not ok.');
        }
        const data = await response.arrayBuffer();
        const imageUrl = URL.createObjectURL(new Blob([data]));
        return imageUrl;
    } catch (error) {
        console.error('Error al obtener imagen por id de usuario: ', error);
        throw error;
    }
};

// IMAGEN POR ID AUTOR
export const imagenPorIdAutor = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/imagen/autor/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la imagen por id de autor. Response not ok.');
        }
        const data = await response.arrayBuffer();
        const imageUrl = URL.createObjectURL(new Blob([data]));
        return imageUrl;
    } catch (error) {
        console.error('Error al obtener imagen por id de autor: ', error);
        throw error;
    }
};

// IMAGEN POR ID SECCION
export const imagenPorIdSeccion = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/imagen/seccion/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la imagen por id de seccion. Response not ok.');
        }
        const data = await response.arrayBuffer();
        const imageUrl = URL.createObjectURL(new Blob([data]));
        return imageUrl;
    } catch (error) {
        console.error('Error al obtener imagen por id de seccion: ', error);
        throw error;
    }
};
