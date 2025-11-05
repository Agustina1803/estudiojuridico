import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";
import FormNuevoJuicio from "../../components/FormNuevoJuicio";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import SearchBar from "../../components/SearchBar";

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
  const tipo = "juicios";
  const [filas, setFilas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaDeJuicio, setBusquedaDeJuicio] = useState("");

  useEffect(() => {
    const juiciosGuardados = localStorage.getItem("juicios");
    if (juiciosGuardados) {
      setFilas(JSON.parse(juiciosGuardados));
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
    const juicio = filas.find((item) => item.id === id);
    setItemEditar(juicio);
    setMostrarModal(true);
  };

  const agregarJuicios = (juicio) => {
    let actualizadas;
    if (itemEditar) {
      actualizadas = filas.map((fila) =>
        fila.id === juicio.id ? juicio : fila
      );
    } else {
      actualizadas = [...filas, juicio];
    }
    setFilas(actualizadas);
    localStorage.setItem(tipo, JSON.stringify(actualizadas));
    cerrarModal();
  };

  const eliminar = (id) => {
    const juicio = filas.find((item) => item.id === id);
    Swal.fire({
      title: `¿Eliminar a jucio ${juicio.nombreDeJuicio}?`,
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
          text: "El juicio fue eliminado correctamente.",
          icon: "success",
        });
      }
    });
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

  const filasFiltradas = filas.filter(
    (fila) =>
      busquedaDeJuicio === "" ||
      fila.nombreDeJuicio
        ?.toLowerCase()
        .trim()
        .includes(busquedaDeJuicio.toLowerCase()) ||
      fila.numeroExpediente?.toString().trim().includes(busquedaDeJuicio)
  );

  return (
    <>
      <SearchBar
        onSearch={setBusquedaDeJuicio}
        placeholder="Buscar por  juicio o expediente..."
      />

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
