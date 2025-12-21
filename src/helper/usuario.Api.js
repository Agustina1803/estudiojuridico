const urlUsuarios = import.meta.env.VITE_API_USUARIOS;

export const listarAbogados = async () => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlUsuarios}?role=abog`, {
      headers: { "x-token": token },
    });
    if (!respuesta.ok) throw new Error("Error al obtener abogados");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const listarUsuarios = async () =>{
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlUsuarios}`, {
      headers: { "x-token": token },
    });
    if (!respuesta.ok) throw new Error("Error al obtener usuarios");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const crearUsuario = async (usuarioNuevo) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlUsuarios}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(usuarioNuevo),
    });
    if (!respuesta.ok) {
      throw new Error("Error al crear el usuario");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const actualizarUsuario = async (usuario) => {
  try {
    const token = localStorage.getItem("token");
    const { id, ...body } = usuario; 
    const respuesta = await fetch(`${urlUsuarios}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(body),
    });
    if (!respuesta.ok) {
      throw new Error("Error al actualizar el usuario");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

