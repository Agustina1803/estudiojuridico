const urlEstudio = import.meta.env.VITE_URL_DESARROLLO;

export const listarCita  = async (estado = "", fecha = "") => {
  try {
    const queryParams = new URLSearchParams();
    if (estado) queryParams.append("estado", estado);
    if (fecha) queryParams.append("fecha", fecha);
    const respuesta = await fetch(
      `${urlEstudio}/tareas?${queryParams.toString()}`
    );
    if (!respuesta.ok) {
      throw new Error("Error al listar las tareas");
    }
    return await respuesta.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}


