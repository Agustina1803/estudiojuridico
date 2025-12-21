const urlEstudio = import.meta.env.VITE_API_DESARROLLO;

export const listarFacturas = async (
  nombreCliente = "",
  estado = "",
  fecha = ""
) => {
  try {
    const queryParams = new URLSearchParams();
    if (nombreCliente) queryParams.append("nombreCliente", nombreCliente);
    if (estado) queryParams.append("estado", estado);
    if (fecha) queryParams.append("fecha", fecha);

    const respuesta = await fetch(
      `${urlEstudio}/facturacion?${queryParams.toString()}`
    );
    if (!respuesta.ok) {
      throw new Error("Error al listar las facturas");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const crearFacturas = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/facturacion`, {
      method: "POST",
      headers: {
        "x-token": token,
      },
      body: formData,
    });
    if (!respuesta.ok) throw new Error("Error al crear la factura");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const actualizarFacturas = async (formData, id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/facturacion/${id}`, {
      method: "PUT",
      headers: {
        "x-token": token,
      },
      body: formData,
    });
    if (!respuesta.ok) {
      throw new Error("Error al actualizar la factura");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const eliminarFacturas = async (_id) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/facturacion/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    });
    if (!respuesta.ok) {
      throw new Error("Error al eliminar la factura");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const descargarFactura = async (id) => {
  try {
    window.open(`${urlEstudio}/facturacion/${id}/descargar`, "_blank");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
