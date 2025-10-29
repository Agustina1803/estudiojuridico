import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

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

 return (
    <>
      <Tablageneral
        columnas={columnas}
        filas={filas}
        claves={claves}
        acciones={(fila) => (
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <Boton action="descargar" onClick={() => descargar(fila.id)}  />
          </div>
        )}
      />
    </>
  );
};
export default DocumentosAdmi