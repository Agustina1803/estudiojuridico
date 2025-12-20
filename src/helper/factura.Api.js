const urlEstudio = import.meta.env.VITE_API_DESARROLLO;

export const listarFacturas = async (
  nombreCliente = "",
  fecha = "",
  estado = ""
) => {
  try {
    const queryParams = new URLSearchParams();
    if (nombreCliente) queryParams.append("nombreCliente", nombreCliente);
    if (fecha) queryParams.append("fecha", fecha);
    if (estado) queryParams.append("estado", estado);

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
    const respuesta = await fetch("http://localhost:3001/api/facturacion", {
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
    return [];
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
    return [];
  }
};

export const descargarFactura = async (id) => {
  try {
    window.open(`${urlEstudio}/facturacion/${id}/descargar`, "_blank");
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error al descargar la factura",
      timer: 2000,
      showConfirmButton: false,
    });
  }
};
