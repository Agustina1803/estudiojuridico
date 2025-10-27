import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";
import { ver, editar, eliminar } from "../../utils/AccionesBoton";
import FormNuevoCliente from "../../components/FormNuevoCliente";
import Buscador from "../../components/Buscador";
import { useState, useEffect } from "react";

const ClientesSecre = () => {
  const columnas = ["Nº", "Nombre", "DNI / CUIT", "Email", "Teléfono", "Estado"];
  const claves = ["nombre", "dni", "email", "telefono", "estado"];
  const tipo = "clientes";
 const [filas, setFilas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const clientesGuardados = localStorage.getItem("clientes");
    if (clientesGuardados) {
      setFilas(JSON.parse(clientesGuardados));
    }
  }, []);

   const abrirModal = () => {
    setItemEditar(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setItemEditar(null);
    setMostrarModal(false);
  };

    const ver = (id) => {
    const cliente = filas.find((item) => item.id === id);
    Swal.fire({
      title: "Detalles",
      text: `Fecha: ${cliente.fecha}
      Hora: ${cliente.hora}
      Cliente: ${cliente.cliente}
      Abogado: ${cliente.abogado}
      Tipo de Evento: ${cliente.tipoEvento}
      Notas: ${cliente.notas || "Sin notas"}`,
      confirmButtonText: "Cerrar",
    });
  };

    const editar = (id) => {
    const cliente = filas.find((item) => item.id === id);
    setItemEditar(cliente);
    setMostrarModal(true);
  };

  const agregarCita = (nuevaCita) => {
    const nuevasFilas = [...filas, nuevaCita];
    setFilas(nuevasFilas);
    localStorage.setItem("citas", JSON.stringify(nuevasFilas));
    cerrarModal();
  };

    const eliminar = (id) => {
    const cliente = filas.find((item) => item.id === id);
    Swal.fire({
      title: `¿Eliminar la ${cliente.tipoEvento} de ${cliente.cliente}?`,
      text: "Este cambio no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadas = filas.filter((item) => item.id !== id);
        setFilas(actualizadas);
        localStorage.setItem(tipo, JSON.stringify(actualizadas));
        Swal.fire({
          title: "Eliminado",
          text: "La cita fue eliminada correctamente.",
          icon: "success",
        });
      }
    });
  };

   const filasFiltradas = filas.filter(
    (fila) =>
      fila.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      fila.dni?.toLowerCase().includes(busqueda.toLowerCase()) ||
      fila.email?.toLowerCase().includes(busqueda.toLowerCase())
  );

 return (
    <>
      <Buscador onSearch={setBusqueda} />

      <Tablageneral
        columnas={columnas}
        filas={filasFiltradas}
        claves={claves}
        acciones={(fila) => (
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <Boton action="ver" onClick={() => verCliente(fila.id)} />
            <Boton action="editar" onClick={() => editarCliente(fila.id)} />
            <Boton action="eliminar" onClick={() => eliminarCliente(fila.id)} />
          </div>
        )}
      />

      <div className="d-flex justify-content-end mt-3">
        <Boton action="agregar" onClick={abrirModal} />
      </div>

      <FormNuevoCliente
        mostrar={mostrarModal}
        cerrar={cerrarModal}
        onGuardar={agregarCliente}
        itemEditar={itemEditar}
      />
    </>
  );
};

export default ClientesSecre;
