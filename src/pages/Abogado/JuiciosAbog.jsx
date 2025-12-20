import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import FormNuevoJuicio from "../../components/FormNuevoJuicio";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BarraBusqueda from "../../components/BarraBusqueda";
import {
  listarJuicios,
  crearJuicios,
  actualizarJuicios,
  eliminarJuicios,
} from "../../helper/juicios.Api";
import { crearFacturas } from "../../helper/factura.Api";

const JuiciosAbog = () => {
  const columnas = [
    "Nº",
    "Nombre de juicio",
    "Numero de expediente",
    "Cliente",
    "Juzgado",
    "Fecha",
    "Archivo",
  ];
  const claves = [
    "nombreDeJuicio",
    "numeroExpediente",
    "nombreCliente",
    "juzgado",
    "fecha",
    "seleccionarArchivo",
  ];

  const [filasFiltrada, setFilasFiltradas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaNumeroExpediente, setBusquedaNumeroExpediente] = useState("");

  const obtenerFilasFiltradas = async () => {
    try {
      const data = await listarCitas(busquedaNumeroExpediente);
      const juiciosTransformados = data.map((juicios) => ({
        ...juicios,
        archivoNombre: (
          <a
            href={juicios.seleccionarArchivo?.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {juicios.seleccionarArchivo?.nombre || "archivo"}
          </a>
        ),
      }));
      setFilasFiltradas(juiciosTransformados);
    } catch (error) {
      console.error("Error al obtener el juicio:");
    }
  };

  useEffect(() => {
    obtenerFilasFiltradas();
  }, [busquedaNumeroExpediente]);

  const abrirModal = () => {
    setItemEditar(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setItemEditar(null);
    setMostrarModal(false);
  };

  const editar = (id) => {
    const juicios = filasFiltradas.find((item) => item._id === id);
    setItemEditar(juicios);
    setMostrarModal(true);
  };

  const agregarJuicios = async (formData, id) => {
    let nuevoJuicio;
   if (itemEditar) {
      nuevoJuicio = await actualizarJuicios(formData, id);
    } else {
      nuevoJuicio = await crearFacturas(formData);
    }
    if (nuevoJuicio) {
      obtenerFilasFiltradas();
      cerrarModal();
    }
  };

  const eliminar = async (id) => {
    const juicios = filasFiltrada.find((item) => item._id === id);
    Swal.fire({
      title: `¿Eliminar a jucio ${juicios.nombreDeJuicio}?`,
      text: "Este cambio no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (confirmada.isConfirmed) {
          const ok = await eliminarJuicios(juicios._id);
          if (ok) {
            Swal.fire({
              title: "Eliminado",
              text: "El juicio fue eliminada correctamente.",
              icon: "success",
            });
            obtenerFilasFiltradas();
          }
        }
      };

  const descargar = (id) => {
    const cliente = filas.find((item) => item.id === id);
    Swal.fire({
      icon: "success",
      title: `¡${cliente.seleccionarArchivo} descargado!`,
      timer: 2000,
      showConfirmButton: false,
    });
  };



  return (
    <>
      <BarraBusqueda
        onSearch={setBusquedaDeJuicio}
        placeholder="Buscar por  juicio o expediente..."
      />

      <Tablageneral
        columnas={columnas}
        filas={filasFiltrada}
        claves={claves}
        acciones={(fila) => (
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <Boton action="editar" onClick={() => editar(fila.id)} />
            <Boton action="eliminar" onClick={() => eliminar(fila.id)} />
            <Boton action="descargar" onClick={() => descargar(fila.id)} />
          </div>
        )}
      />

      <div className="d-flex justify-content-end mt-3">
        <Boton action="agregar" onClick={abrirModal} />
      </div>

      <FormNuevoJuicio
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarJuicios}
        itemEditar={itemEditar}
      />
    </>
  );
};
export default JuiciosAbog;
