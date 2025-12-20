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

export const crearFacturas = async (facturaNueva) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await fetch(`${urlEstudio}/facturacion`, {
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

export const actualizarFacturas = async (factura) => {
  try {
    const token = localStorage.getItem("token");      
      const { _id, ...body } = factura;
      const respuesta = await fetch(`${urlEstudio}/facturacion/${_id}`, {  
         method: "PUT", 
         headers: {
             "Content-Type": "application/json",
               "x-token": token,
         },
         body: JSON.stringify(body),
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