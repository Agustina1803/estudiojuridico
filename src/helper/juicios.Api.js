const urlEstudio = import.meta.env.VITE_API_DESARROLLO;

export const listarJuicios = async (numeroExpediente = "") => {
  try {
    const queryParams = new URLSearchParams();
    if (numeroExpediente) queryParams.append("numeroExpediente", numeroExpediente);
    const respuesta = await fetch(
      `${urlEstudio}/juicios?${queryParams.toString()}`
    );
    if (!respuesta.ok) {
      throw new Error("Error al listar los juicios");
    }
    return await respuesta.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const crearJuicios = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/juicios`, {
      method: "POST",
      headers: {
        "x-token": token,
      },
      body:formData,
    });
    if (!respuesta.ok) {
      throw new Error("Error al crear el juicio");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const actualizarJuicios = async (formData, id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/juicios/${id}`, {
      method: "PUT",
      headers: {
        "x-token": token,
      },
      body: formData,
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

export const eliminarJuicios = async (_id) => {
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

export const descargarJuicio = async (id) => {
  try {
    window.open(`${urlEstudio}/juicios/${id}/descargar`, "_blank");
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error al descargar el juicio",
      timer: 2000,
      showConfirmButton: false,
    });
  }
};
