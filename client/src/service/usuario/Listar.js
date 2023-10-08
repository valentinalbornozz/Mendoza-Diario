//  TODOS LOS USUARIOS
export const listaUsuarios = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/usuario/listar');
        if (!response.ok) {
            throw new Error('Error al obtener la lista de usuarios: La respuesta no esta ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la lista de usuarios de la api: ', error);
        throw error; // Propaga el error para que el llamador pueda manejarlo
    }
};

//  USUARIO POR ID
export const usuarioPorId = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/usuario/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el usuario por id. Response not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener usuario por id: ', error);
        throw error;
    }
};

//  USUARIO POR EMAIL
export const usuarioPorEmail = async (email) => {
    try {
        const response = await fetch(`http://localhost:8080/api/usuario/email/${email}`);
        if (!response.ok) {
            throw new Error('Error al obtener el usuario por email. Response not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener usuario por email: ', error);
        throw error;
    }
};

//  USUARIO POR NOMBRE DE USUARIO
export const usuarioPorUsername = async (nombreUsuario) => {
    try {
        const response = await fetch(`http://localhost:8080/api/usuario/username/${nombreUsuario}`);
        if (!response.ok) {
            throw new Error('Error al obtener el usuario por username. Response not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener usuario por username: ', error);
        throw error;
    }
};