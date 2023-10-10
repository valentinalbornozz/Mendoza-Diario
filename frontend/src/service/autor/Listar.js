//  TODOS LOS AUTORES
export const listaAutores = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/autor/listar');
        if (!response.ok) {
            throw new Error('Error al obtener la lista de autores');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la lista de autores: ', error);
        throw error; // Propaga el error para que el llamador pueda manejarlo
    }
};

//  AUTOR POR ID
export const autorPorId = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/autor/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el autor por id. Response not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener autor por id: ', error);
        throw error;
    }
};