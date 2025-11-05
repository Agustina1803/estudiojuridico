import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";
import Swal from "sweetalert2";
import FormNuevaTarea from "../../components/FormNuevaTarea";
import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import SearchDate from "../../components/SearchDate";

const TareasAbog = () => {
  const columnas = [
    "Nº",
    "Descripcion",
    "Responsable",
    "Prioridad",
    "Fecha limite",
  ];
  const claves = ["descripcion", "responsable", "prioridad", "fecha"];
  const tipo = "tareas";
  const [filas, setFilas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaAbogado, setbusquedaAbogado] = useState("");
  const [busquedaFecha, setbusquedaFecha] = useState("");

  useEffect(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      setFilas(JSON.parse(tareasGuardadas));
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
    console.log("Editar tarea con id:", id);
    console.log("Filas actuales:", filas);
    const cliente = filas.find((item) => item.id === id);

    setItemEditar(cliente);
    setMostrarModal(true);
  };

  const agregarTareas = (nuevatarea) => {
    let actualizadas;
    if (itemEditar) {
      actualizadas = filas.map((fila) =>
        fila.id === nuevatarea.id ? nuevatarea : fila
      );
    } else {
      actualizadas = [...filas, nuevatarea];
    }
    setFilas(actualizadas);
    localStorage.setItem(tipo, JSON.stringify(actualizadas));
    cerrarModal();
  };

  const eliminar = (id) => {
    const cliente = filas.find((item) => item.id === id);
    Swal.fire({
      title: `¿Eliminar la ${cliente.descripcion} ?`,
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
          text: "La tarea fue eliminada correctamente.",
          icon: "success",
        });
      }
    });
  };

  const filasFiltradas = filas
    .filter(
      (fila) =>
        busquedaAbogado === "" ||
        fila.abogado
          ?.toLowerCase()
          .trim()
          .includes(busquedaAbogado.toLowerCase())
    )
    .filter(
      (fila) =>
        busquedaFecha === "" || fila.fecha?.trim().startsWith(busquedaFecha)
    );

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <SearchBar onSearch={setbusquedaAbogado} placeholder="Buscar por responsable..."/>
        <SearchDate onDateChange={setbusquedaFecha} />
      </div>
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
      <FormNuevaTarea
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarTareas}
        itemEditar={itemEditar}
      />
    </>
  );
};

export default TareasAbog;
