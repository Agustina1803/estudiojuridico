import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import FormNuevoCliente from "../../components/FormNuevoCliente";
import BarraBusqueda from "../../components/BarraBusqueda";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { listarClientes, crearCliente, actualizarCliente, eliminarCliente } from "../../helper/cliente.Api";

const ClientesSecre = () => {
  const columnas = [
    "Nº",
    "Nombre",
    "DNI / CUIT",
    "Email",
    "Teléfono",
    "Estado",
  ];
  const claves = ["nombre", "identificador", "email", "telefono", "estadoCliente"];
  const [filasFiltradas, setFilasFiltradas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaIdentificador, setBusquedaIdentificador] = useState("");

  const obtenerFilasFiltradas = async () => {
    try {
      const data = await listarClientes(busquedaIdentificador);
      const clientesTransformados = data.map((cliente) => ({
        ...cliente,
      }));
      setFilasFiltradas(clientesTransformados);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  useEffect(() => {
    obtenerFilasFiltradas();
  }, [busquedaIdentificador]);

  const abrirModal = () => {
    setItemEditar(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setItemEditar(null);
    setMostrarModal(false);
  };

  const editar = (id) => {
    const cliente = filasFiltradas.find((item) => item._id === id);
    setItemEditar(cliente);
    setMostrarModal(true);
  };

  const agregarCliente = async (cliente) => {
    let nuevoCliente;
    if (itemEditar) {
      nuevoCliente = await actualizarCliente({ ...cliente, _id: itemEditar._id });
    } else {
      nuevoCliente = await crearCliente(cliente);
    }

    if (nuevoCliente) {
      obtenerFilasFiltradas();
      cerrarModal();
    }
  };

  const eliminar = async (id) => {
    const cliente = filasFiltradas.find((item) => item._id === id);
    if (!cliente) return; // seguridad extra

    const confirmado = await Swal.fire({
      title: `¿Eliminar al cliente ${cliente.nombre}?`,
      text: "Este cambio no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmado.isConfirmed) {
      const ok = await eliminarCliente(cliente._id);
      if (ok) {
        Swal.fire({
          title: "Eliminado",
          text: "El cliente fue eliminado correctamente.",
          icon: "success",
        });
        obtenerFilasFiltradas();
      }
    }
  };

  return (
    <>
      <BarraBusqueda onSearch={setBusquedaIdentificador} placeholder="Buscar por DNI..." />

      <Tablageneral
        columnas={columnas}
        filas={filasFiltradas}
        claves={claves}
        acciones={(fila) => (
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <Boton action="editar" onClick={() => editar(fila._id)} />
            <Boton action="eliminar" onClick={() => eliminar(fila._id)} />
          </div>
        )}
      />

      <div className="d-flex justify-content-end mt-3">
        <Boton action="agregar" onClick={abrirModal} />
      </div>

      <FormNuevoCliente
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarCliente}
        itemEditar={itemEditar}
      />
    </>
  );
};

export default ClientesSecre;
