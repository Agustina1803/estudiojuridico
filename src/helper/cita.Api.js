const urlEstudio = import.meta.env.VITE_API_DESARROLLO;

export const listarCitas = async (cliente = "", fecha = "") => {
  try {
    const queryParams = new URLSearchParams();
    if (cliente) queryParams.append("cliente", cliente);
    if (fecha) queryParams.append("fecha", fecha);
    const respuesta = await fetch(
      `${urlEstudio}/citas?${queryParams.toString()}`
    );
    if (!respuesta.ok) {
      throw new Error("Error al listar las citas");
    }
    return await respuesta.json();
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
    const { _id, ...body } = cita; 
    const respuesta = await fetch(`${urlEstudio}/citas/${cita._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(body),
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
