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
