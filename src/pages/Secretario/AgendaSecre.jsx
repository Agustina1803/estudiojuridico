import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import Swal from "sweetalert2";
import FormAgregarCita from "../../components/FormAgregarCita";
import { useState, useEffect } from "react";
import BarraBusqueda from "../../components/BarraBusqueda";
import BarraBusquedaFecha from "../../components/BarraBusquedaFecha";
import {
  listarCitas,
  crearCita,
  actualizarCita,
  eliminarCita,
} from "../../helper/cita.Api";
import { listarAbogados } from "../../helper/usuario.Api";

const AgendaSecre = () => {
  const columnas = [
    "Nº",
    "Fecha",
    "Hora",
    "Cliente",
    "Abogado",
    "Tipo de Evento",
    "Notas",
  ];
  const claves = ["fecha", "hora", "cliente", "abogado", "tipoEvento", "notas"];
  const [filasFiltradas, setFilasFiltradas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaNombre, setNombre] = useState("");
  const [busquedaFecha, setFecha] = useState("");

  const obtenerFilasFiltradas = async () => {
    try {
      const data = await listarCitas(busquedaNombre, busquedaFecha);
      const citasTransformadas = data.map((cita) => ({
        ...cita,
        abogado:
          cita.abogado && typeof cita.abogado === "object"
            ? `${cita.abogado.nombre} ${cita.abogado.apellido}`
            : cita.abogado,
      }));
      setFilasFiltradas(citasTransformadas);
    } catch (error) {
      console.error("Error al obtener citas:", error);
    }
  };

  useEffect(() => {
    obtenerFilasFiltradas();
  }, [busquedaNombre, busquedaFecha]);

  const abrirModal = () => {
    setItemEditar(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setItemEditar(null);
    setMostrarModal(false);
  };

  const editar = (id) => {
    const cita = filasFiltradas.find((item) => item._id === id);
    setItemEditar(cita);
    setMostrarModal(true);
  };

  const [abogados, setAbogados] = useState([]);
  useEffect(() => {
    const cargarAbogados = async () => {
      const data = await listarAbogados();
      setAbogados(data);
    };
    cargarAbogados();
  }, []);

  const eliminar = async (id) => {
    const cita = filasFiltradas.find((item) => item._id === id);
    const confirmado = await Swal.fire({
      title: `¿Eliminar la ${cita.tipoEvento} del cliente ${cita.cliente}?`,
      text: "Este cambio no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmado.isConfirmed) {
      const ok = await eliminarCita(cita._id);
      if (ok) {
        Swal.fire({
          title: "Eliminado",
          text: "La cita fue eliminada correctamente.",
          icon: "success",
        });
        obtenerFilasFiltradas();
      }
    }
  };

  const agregarCita = async (cita) => {
    let nuevaCita;
    if (itemEditar) {
      nuevaCita = await actualizarCita({ ...cita, _id: itemEditar._id });
    } else {
      nuevaCita = await crearCita(cita);
      await registrarMovimiento({
        citaId: nuevaCita._id,
        nombre: nuevaCita.cliente,
        tipoEvento: "agregarCita",
      });
    }

    if (nuevaCita) {
      obtenerFilasFiltradas();
      cerrarModal();
    }
  };

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <BarraBusqueda
          onSearch={setNombre}
          placeholder="Buscar por cliente..."
        />
        <BarraBusquedaFecha onDateChange={setFecha} />
      </div>
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
      <FormAgregarCita
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarCita}
        itemEditar={itemEditar}
        abogados={abogados}
      />
    </>
  );
};

export default AgendaSecre;
