const urlEstudio = import.meta.env.VITE_API_DESARROLLO;

export const listarJuicios = async (numeroExpediente = "") => {
  try {
    const queryParams = new URLSearchParams();
    if (numeroExpediente) queryParams.append("cliente", numeroExpediente);
    const respuesta = await fetch(
      `${urlEstudio}/juicios?${queryParams.toString()}`
    );
    if (!respuesta.ok) {
      throw new Error("Error al listar los juicios");
    }
    return await respuesta.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const crearJuicio = async (juicioNueva) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/juicios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(juicioNueva),
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

export const actualizarJuicio = async (juicio) => {
  try {
    const token = localStorage.getItem("token");
    const { _id, ...body } = juicio; 
    const respuesta = await fetch(`${urlEstudio}/juicios/${juicio._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(body),
    });
    if (!respuesta.ok) {
      throw new Error("Error al actualizar el juicio");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const eliminarJuicio = async (_id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/juicios/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    });
    if (!respuesta.ok) {
      throw new Error("Error al eliminar el juicio");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};