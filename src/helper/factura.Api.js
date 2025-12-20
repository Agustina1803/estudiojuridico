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
      `${urlEstudio}/factura?${queryParams.toString()}`
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

export const crearFactura = async (facturaNueva) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/factura`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(facturaNueva),
    });
    if (!respuesta.ok) {
      throw new Error("Error al crear la factura");
    }
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
