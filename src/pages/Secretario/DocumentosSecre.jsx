import Tablageneral from "../../components/TablaGeneral";
import Boton from "../../components/Boton";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import FormSubirArchivo from "../../components/FormSubirArchivo";
import BarraBusqueda from "../../components/BarraBusqueda";
import BarraBusquedaFecha from "../../components/BarraBusquedaFecha";
import {
 listarArchivos,
  crearArchivos,
  actualizarDocumentos,
   eliminarDocumento,
   descargarDocumento
} from "../../helper/subirArchivo.Api";

const DocumentosSecre = () => {
  const columnas = [
    "Nº",
    "Nombre de documento",
    "Cliente",
    "Tipo de Evento",
    "Fecha",
  ];
  const claves = [
    "archivoNombre",
    "nombreCliente",
    "tipodearchivo",
    "fecha",
  ];

 const [filasFiltradas, setFilasFiltradas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaCliente, setBusquedaCliente] = useState("")
  const [busquedaFecha, setbusquedaFecha] = useState("");

 const obtenerFilasFiltradas = async () => {
     try {
       const data = await  listarArchivos(
         busquedaCliente,
         busquedaFecha
       );
       const ArchivoTransformado = data.map((archivo) => ({
         ...archivo,
         archivoNombre: (
           <a
             href={archivo.seleccionarArchivo?.url}
             target="_blank"
             rel="noopener noreferrer"
           >
            
             {archivo.seleccionarArchivo?.nombre || "archivo"}
           </a>
         ),
       }));
       setFilasFiltradas(ArchivoTransformado);
     } catch (error) {
       console.error("Error al obtener el archivo:", error);
     }
   };
 
   useEffect(() => {
     obtenerFilasFiltradas();
   }, [busquedaCliente, busquedaFecha]);

  const abrirModal = () => {
    setItemEditar(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setItemEditar(null);
    setMostrarModal(false);
  };

  const editar = (id) => {
    const archivos = filasFiltradas.find((item) => item._id === id);
    setItemEditar(archivos);
    setMostrarModal(true);
  };

  const eliminar = async (id) => {
    const archivos = filasFiltradas.find((item) => item._id === id);
    const resultado = await Swal.fire({
      title: `¿Eliminar ${archivos.seleccionarArchivo?.nombre || 'este archivo'}? `,
      text: "Este cambio no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (resultado.isConfirmed) {
      const ok = await eliminarDocumento(archivos._id);
      if (ok) {
        Swal.fire({
          title: "Eliminado",
          text: "El archivo fue eliminado correctamente.",
          icon: "success",
        });
        obtenerFilasFiltradas();
      }
    }
  };
  const agregarDocumento = async (formData, id) => {
    let nuevoDocumento;
    if (itemEditar) {
      nuevoDocumento = await actualizarDocumentos(formData, id);
    } else {
      nuevoDocumento = await crearArchivos(formData);
    }
    if (nuevoDocumento) {
      obtenerFilasFiltradas();
      cerrarModal();
    }
  };



    const descargar = async (id) => {
      const respuesta = await descargarDocumento(id);
      if (respuesta) {
        Swal.fire({
          icon: "success",
          title: "¡Documento descargado!",

        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al descargar el documento",
          
        });
      }
    };

  
  return (
    <>
      <div className="d-flex justify-content-evenly">
        <BarraBusqueda onSearch={ setBusquedaCliente} placeholder="Buscar por cliente..."/>
        <BarraBusquedaFecha onDateChange={setbusquedaFecha} />
      </div>
      <Tablageneral
        columnas={columnas}
        filas={filasFiltradas}
        claves={claves}
        acciones={(fila) => (
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <Boton action="editar" onClick={() => editar(fila._id)} />
            <Boton action="eliminar" onClick={() => eliminar(fila._id)} />
            <Boton action="descargar" onClick={() => descargar(fila._id)} />
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
