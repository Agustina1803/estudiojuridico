import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";
import FormNuevoCliente from "../../components/FormNuevoCliente";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BarraBusqueda from "../../components/BarraBusqueda";

const ClientesAbog = () => {
  const columnas = [
    "Nº",
    "Nombre",
    "DNI / CUIT",
    "Email",
    "Teléfono",
    "Estado",
  ];
  const claves = ["nombre", "identificador", "email", "telefono", "prioridad"];
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

  const editar = (id) => {
    const cliente = filas.find((item) => item.id === id);
    setItemEditar(cliente);
    setMostrarModal(true);
  };

  const agregarCliente = (cliente) => {
    let actualizadas;
    if (itemEditar) {
      actualizadas = filas.map((fila) =>
        fila.id === cliente.id ? cliente : fila
      );
    } else {
      actualizadas = [...filas, cliente];
    }
    setFilas(actualizadas);
    localStorage.setItem(tipo, JSON.stringify(actualizadas));
    cerrarModal();
  };

  const eliminar = (id) => {
    const cliente = filas.find((item) => item.id === id);
    Swal.fire({
      title: `¿Eliminar al cliente ${cliente.nombre}?`,
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
          text: "El cliente fue eliminada correctamente.",
          icon: "success",
        });
      }
    });
  };

  const filasFiltradas = filas.filter(
    (fila) =>
      fila.nombre
        ?.trim()
        .toLowerCase()
        .includes(busqueda.trim().toLowerCase()) ||
      fila.identificador
        ?.trim()
        .toLowerCase()
        .includes(busqueda.trim().toLowerCase()) ||
      fila.email?.trim().toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  return (
    <>
      <BarraBusqueda onSearch={setBusqueda} placeholder="Buscar por cliente, DNI/CUIT..." />

      <Tablageneral
        columnas={columnas}
        filas={filasFiltradas}
        claves={claves}
        acciones={(fila) => (
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <Boton action="editar" onClick={() => editar(fila.id)} />
            <Boton action="eliminar" onClick={() => eliminar(fila.id)} />
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
export default ClientesAbog