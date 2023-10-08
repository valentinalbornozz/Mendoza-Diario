//  TODAS LAS SECCIONES
export const listaSecciones = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/seccion/listar');
        if (!response.ok) {
            throw new Error('Error al obtener la lista de secciones: La respuesta no esta ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la lista de secciones de la api: ', error);
        throw error; // Propaga el error para que el llamador pueda manejarlo
    }
};

//  SECCION POR ID
export const seccionPorId = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/seccion/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la seccion por id. Response not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener seccion por id: ', error);
        throw error;
    }
};

//  SECCION POR CODIGO
export const seccionPorCodigo = async (codigo) => {
    try {
        const response = await fetch(`http://localhost:8080/api/seccion/codigo/${codigo}`);
        if (!response.ok) {
            throw new Error('Error al obtener la seccion por codigo. Response not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener seccion por codigo: ', error);
        throw error;
    }
};