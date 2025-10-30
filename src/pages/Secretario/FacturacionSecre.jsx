import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import FormNuevaFactura from "../../components/FormNuevaFactura";

const FacturacionSecre = () => {
  const columnas = ["Nº", "Fecha", "Cliente", "Concepto", "Monto"];
  const claves = [
    "fecha",
   "nombreCliente",
    "concepto",
    "seleccionarArchivo",
    "monto"
  ];
  const tipo = "facturas";
  const [filas, setFilas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);


  useEffect(() => {
    const facturasGuardadas = localStorage.getItem("facturas");
    if (facturasGuardadas) {
      setFilas(JSON.parse(facturasGuardadas));
    }
  }, []);

  const abrirModal = () => {
   
    setMostrarModal(true);
  };

  const cerrarModal = () => {

    setMostrarModal(false);
  };

  const agregarFactura = (facturas) => {
    let actualizadas;
    actualizadas = [...filas, facturas];
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

  return (
    <>
      <Tablageneral
        columnas={columnas}
        filas={filas}
        claves={claves}
        acciones={(fila) => (
          <div className="d-flex gap-2 align-items-center justify-content-center">
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
      />
    </>
  );
};

export default FacturacionSecre;
