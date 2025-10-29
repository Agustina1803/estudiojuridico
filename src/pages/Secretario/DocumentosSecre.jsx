import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import FormSubirArchivo from "../../components/FormSubirArchivo";

const DocumentosSecre = () => {
  const columnas = [
    "Nº",
    "Nombre de documento",
    "Cliente",
    "Tipo de Evento",
    "Fecha",
  ];
  const claves = [
    "seleccionarArchivo",
    "nombreCliente",
    "tipodearchivo",
    "fecha",
  ];
  const tipo = "documentos";
  const [filas, setFilas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);

  useEffect(() => {
    const documentosGuardados = localStorage.getItem("documentos");
    if (documentosGuardados) {
      setFilas(JSON.parse(documentosGuardados));
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
      title: `¿Eliminar ${cliente.seleccionarArchivo}? `,
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
          text: "El documento fue eliminado correctamente.",
          icon: "success",
        });
      }
    });
  };
  const agregarDocumento = (documentos) => {
    let actualizadas;
    if (itemEditar) {
      actualizadas = filas.map((fila) =>
        fila.id === documentos.id ? documentos : fila
      );
    } else {
      actualizadas = [...filas, documentos];
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
  return (
    <>
      <Tablageneral
        columnas={columnas}
        filas={filas}
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
      <FormSubirArchivo
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarDocumento}
        itemEditar={itemEditar}
      />
    </>
  );
};

export default DocumentosSecre;
