import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import FormNuevaFactura from "../../components/FormNuevaFactura";
import SearchBar from "../../components/SearchBar";
import SearchDate from "../../components/SearchDate";
import SearchState from "../../components/searchState";
import "../../styles/estados.css";

const FacturacionAbog = () => {
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
  const tipo = "facturas";
  const [filas, setFilas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaNombreMonto, setNombreMonto] = useState("");
  const [busquedaEstado, setEstado] = useState("");
  const [busquedaFecha, setFecha] = useState("");

  useEffect(() => {
    const facturasGuardadas = localStorage.getItem("facturas");
    if (facturasGuardadas) {
      setFilas(JSON.parse(facturasGuardadas));
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

  const eliminar = (id) => {
    const cliente = filas.find((item) => item.id === id);
    Swal.fire({
      title: `¿Eliminar la ${cliente.seleccionarArchivo} del cliente ${cliente.nombreCliente}?`,
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
          text: `La ${cliente.factura} fue eliminada correctamente.`,
          icon: "success",
        });
      }
    });
  };

  const filasFiltradas = filas
    .filter(
      (fila) =>
        busquedaNombreMonto === "" ||
        fila.nombreCliente
          ?.toLowerCase().trim()
          .includes(busquedaNombreMonto.toLowerCase()) ||
        fila.monto?.toString().trim().includes(busquedaNombreMonto)
    )
    .filter(
      (fila) => busquedaFecha === "" || fila.fecha?.trim().startsWith(busquedaFecha)
    )
    .filter(
      (fila) =>
        busquedaEstado === "" ||
        fila.estado?.trim().toLowerCase() === busquedaEstado.toLowerCase()
    );

  const agregarFactura = (factura) => {
    let actualizadas;
    if (itemEditar) {
      actualizadas = filas.map((fila) =>
        fila.id === factura.id ? factura : fila
      );
    } else {
      actualizadas = [...filas, factura];
    }
    setFilas(actualizadas);
    localStorage.setItem(tipo, JSON.stringify(actualizadas));
    cerrarModal();
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

  const filasConColores = filasFiltradas.map((fila) => ({
    ...fila,
    estado: (
      <span className={`estado-${fila.estado?.toLowerCase()}`}>
        {fila.estado}
      </span>
    ),
  }));

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <SearchBar onSearch={setNombreMonto}  placeholder="Buscar por cliente o monto..."/>
        <SearchState onEstadoChange={setEstado} />
        <SearchDate onDateChange={setFecha} />
      </div>
      <Tablageneral
        columnas={columnas}
        filas={filasConColores}
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


export default FacturacionAbog;