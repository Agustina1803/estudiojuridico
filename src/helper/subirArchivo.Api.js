const urlEstudio = import.meta.env.VITE_API_DESARROLLO;

export const listarArchivos = async (
  nombreCliente = "",
  fecha = ""
) => {
  try {
    const queryParams = new URLSearchParams();
    if (nombreCliente) queryParams.append("nombreCliente", nombreCliente);
    if (fecha) queryParams.append("fecha", fecha);

    const respuesta = await fetch(
      `${urlEstudio}/subirArchivos?${queryParams.toString()}`
    );
    if (!respuesta.ok) {
      throw new Error("Error al listar los documemntos");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const crearArchivos = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/subirArchivos`, {
      method: "POST",
      headers: {
        "x-token": token,
      },
      body: formData,
    });
    if (!respuesta.ok) throw new Error("Error al crear el documento");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const actualizarFacturas = async (formData, id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/subirArchivos${id}`, {
      method: "PUT",
      headers: {
        "x-token": token,
      },
      body: formData,
    });
    if (!respuesta.ok) {
      throw new Error("Error al actualizar el documento");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const eliminarDocumento = async (_id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/subirArchivos${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    });
    if (!respuesta.ok) {
      throw new Error("Error al eliminar el archivo");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const descargarDocumento = async (id) => {
  try {
    window.open(`${urlEstudio}/subirArchivos/descargar`, "_blank");
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error al descargar el documento",
    });
  }
};
