import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import FormNuevaFactura from "../../components/FormNuevaFactura";
import BarraBusqueda from "../../components/BarraBusqueda";
import BarraBusquedaFecha from "../../components/BarraBusquedaFecha";
import BarraBusquedaEstado from "../../components/BarraBusquedaEstado";
import "../../styles/estados.css";
import {
  listarFacturas,
  crearFacturas,
  actualizarFacturas,
  eliminarFacturas,
  descargarFacturas,
} from "../../helper/factura.Api";

const FacturacionSecre = () => {
  const columnas = [
    "Nº",
    "Fecha",
    "Cliente",
    "Concepto",
    "Factura",
    "Monto",
    "Estado",
  ];
  const claves = [
    "fecha",
    "nombreCliente",
    "concepto",
    "seleccionarArchivo",
    "monto",
    "estado",
  ];

  const [filasFiltradas, setFilasFiltradas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaMonto, setNombreMonto] = useState("");
  const [busquedaEstado, setEstado] = useState("");
  const [busquedaFecha, setFecha] = useState("");

  const obtenerFilasFiltradas = async () => {
    try {
      const data = await listarFacturas(
        busquedaMonto,
        busquedaEstado,
        busquedaFecha
      );
      const facturaTransformada = data.map((facturas) => ({
        ...facturas,
      }));
      setFilasFiltradas(facturaTransformada);
    } catch (error) {
      console.error("Error al obtener la factura:", error);
    }
  };

  useEffect(() => {
    obtenerFilasFiltradas();
  }, [busquedaEstado, busquedaFecha]);

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
    setItemEditar(facturas);
    setMostrarModal(true);
  };

  const eliminar = async (id) => {
    const facturas = filasFiltradas.find((item) => item._id === id);
    const confirmada = await Swal.fire({
      title: `¿Eliminar la ${facturas.factura} del cliente ${facturas.nombreCliente}?`,
      text: "Este cambio no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (confirmada.isConfirmed) {
      const ok = await eliminarFacturas(facturas._id);
      if (ok) {
        Swal.fire({
          title: "Eliminado",
          text: "La tarea fue eliminada correctamente.",
          icon: "success",
        });
        obtenerFilasFiltradas();
      }
    }
  };

  const agregarFactura = async (facturas) => {
    let nuevaFactura;
    if (itemEditar) {
      nuevaFactura = await actualizarFacturas({
        ...facturas,
        _id: itemEditar._id,
      });
    } else {
      nuevaFactura = await crearFacturas(facturas);
    }

    if (nuevaFactura) {
      obtenerFilasFiltradas();
      cerrarModal();
    }
  };

  const descargar = async (id) => {
    const respuesta = await descargarFacturas(id);
    if (respuesta) {
      Swal.fire({
        icon: "success",
        title: "¡Factura descargada!",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al descargar la factura",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <BarraBusqueda
          onSearch={setNombreMonto}
          placeholder="Buscar por cliente o monto..."
        />
        <BarraBusquedaEstado onEstadoChange={setEstado} />
        <BarraBusquedaFecha onDateChange={setFecha} />
      </div>
      <Tablageneral
        columnas={columnas}
        filas={filasFiltradas}
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
      <FormNuevaFactura
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarFactura}
        itemEditar={itemEditar}
      />
    </>
  );
};

export default FacturacionSecre;
