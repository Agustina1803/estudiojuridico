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

export const actualizarCita = async (cita) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/citas/${cita._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(cita._id),
    });
    if (!respuesta.ok) {
      throw new Error("Error al actualizar la cita");
    }
    return await respuesta.json();
  } catch (error) {
     console.error(error);
    return null;
  }
};

export const eliminarCita = async (_id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/citas/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    });
    if (!respuesta.ok) {
      throw new Error("Error al eliminar la cita");
    }
    return true;
  } catch (error) {
     console.error(error);
    return false;
  }
};