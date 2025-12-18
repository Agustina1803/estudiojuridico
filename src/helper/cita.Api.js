const urlEstudio = import.meta.env.VITE_API_DESARROLLO;

export const listarCitas = async () => {
  try {
    const respuesta = await fetch(`${urlEstudio}/citas`);
    if (!respuesta.ok) {
      throw new Error("Error al listar las citas");
      return await respuesta.json();
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const crearCita = async (citaNueva) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/citas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(citaNueva),
    });
    if (!respuesta.ok) {
      throw new Error("Error al crear la cita");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
