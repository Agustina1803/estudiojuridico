import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import SearchBar from "../../components/SearchBar";
import SearchDate from "../../components/SearchDate";

const DocumentosAdmi = () => {
  const columnas = [
    "Nº",
    "Nombre de documento",
    "Cliente",
    "Tipo de documento",
    "Fecha de subida",
  ];
  const claves = [
    "seleccionarArchivo",
    "nombreCliente",
    "tipodearchivo",
    "fecha",
  ];

  const [filas, setFilas] = useState([]);
  const [busquedaNombre, setbusquedaNombre] = useState("");
  const [busquedaFecha, setbusquedaFecha] = useState("");

  useEffect(() => {
    const documentosGuardado = localStorage.getItem("documentos");
    if (documentosGuardado) {
      setFilas(JSON.parse(documentosGuardado));
    }
  }, []);
  const descargar = (id) => {
    const cliente = filas.find((item) => item.id === id);
    Swal.fire({
      icon: "success",
      title: `¡${cliente.seleccionarArchivo} descargado!`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

    const filasFiltradas = filas
    .filter(
      (fila) =>
        busquedaNombre === "" ||
        fila.nombreCliente
          ?.toLowerCase()
          .trim()
          .includes(busquedaNombre.toLowerCase())
    )
    .filter(
      (fila) =>
        busquedaFecha === "" || fila.fecha?.trim().startsWith(busquedaFecha)
    );
  return (
    <>
        <div className="d-flex justify-content-evenly">
        <SearchBar onSearch={setbusquedaNombre} placeholder="Buscar por cliente..."/>
        <SearchDate onDateChange={setbusquedaFecha} />
      </div>
      <Tablageneral
        columnas={columnas}
        filas={filasFiltradas}
        claves={claves}
        acciones={(fila) => (
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <Boton action="descargar" onClick={() => descargar(fila.id)} />
          </div>
        )}
      />
    </>
  );
};
export default DocumentosAdmi;
