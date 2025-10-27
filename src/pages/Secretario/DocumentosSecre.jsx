import { useState, useEffect } from "react";
import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";
import Swal from "sweetalert2";
import FormSubirArchivo from "../../components/FormSubirArchivo";
import Buscador from "../../components/Buscador";

const DocumentosSecre = () => {
  const columnas = ["Nº", "Nombre", "Cliente", "Tipo", "Fecha", "Archivo"];
  const claves = ["nombre", "cliente", "tipo", "fecha", "archivo"];
  const tipo = "documentos";

  const [filas, setFilas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const docsGuardados = localStorage.getItem(tipo);
    if (docsGuardados) {
      setFilas(JSON.parse(docsGuardados));
    }
  }, []);

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    // Recargar datos después de cerrar el modal
    const docsGuardados = localStorage.getItem(tipo);
    if (docsGuardados) {
      setFilas(JSON.parse(docsGuardados));
    }
  };

  const eliminar = (id) => {
    const documento = filas.find((item) => item.id === id);
    Swal.fire({
      title: `¿Eliminar el documento "${documento.nombre}"?`,
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

  const descargarDocumento = (id) => {
    const documento = filas.find((item) => item.id === id);
    Swal.fire({
      icon: "info",
      title: "Descargando...",
      text: `Descargando ${documento.archivo}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const filasFiltradas = filas.filter(
    (fila) =>
      fila.nombre?.trim().toLowerCase().includes(busqueda.trim().toLowerCase()) ||
      fila.cliente?.trim().toLowerCase().includes(busqueda.trim().toLowerCase()) ||
      fila.tipo?.trim().toLowerCase().includes(busqueda.trim().toLowerCase()) ||
      fila.archivo?.trim().toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  return (
    <>
      <h2 className="mb-4">Gestión de Documentos</h2>

      <Buscador onSearch={setBusqueda} />

      <Tablageneral
        columnas={columnas}
        filas={filasFiltradas}
        claves={claves}
        acciones={(fila) => (
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <Boton
              action="descargar"
              onClick={() => descargarDocumento(fila.id)}
            />
            <Boton action="eliminar" onClick={() => eliminar(fila.id)} />
          </div>
        )}
      />

      <div className="d-flex justify-content-end mt-3">
        <Boton action="agregar" onClick={abrirModal} />
      </div>

      <FormSubirArchivo mostrar={mostrarModal} cerrar={cerrarModal} />
    </>
  );
};

export default DocumentosSecre;