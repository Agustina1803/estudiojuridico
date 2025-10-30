import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";
import FormNuevoCliente from "../../components/FormNuevoCliente";
import Buscador from "../../components/Buscador";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const JuiciosAbog = () => {
  const columnas = [
    "Nº",
    "Nombre de juicio",
    "Numero de expediente",
    "Cliente",
    "Juzgado",
    "Fecha",
    "Legajo",
   
  ];
  const claves = ["nombre", "expediente", "cliente", "juzgado", "fecha", "legajo"];
  const tipo = "juicios";
  const [filas, setFilas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busqueda, setBusqueda] = useState("");

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
    const juicios = filas.find((item) => item.id === id);
    setItemEditar(juicios);
    setMostrarModal(true);
  };



  const agregarJuicios = (juicios) => {
    let actualizadas;
    if (itemEditar) {
      actualizadas = filas.map((fila) =>
        fila.id === juicios.id ? juicios : fila
      );
    } else {
      actualizadas = [...filas, juicios];
    }
    setFilas(actualizadas);
    localStorage.setItem(tipo, JSON.stringify(actualizadas));
    cerrarModal();
  };

  const eliminar = (id) => {
    const juicios = filas.find((item) => item.id === id);
    Swal.fire({
      title: `¿Eliminar a jucios ${juicios.nombre}?`,
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

  const filasFiltradas = filas.filter(
    (fila) =>
      fila.nombre
        ?.trim()
        .toLowerCase()
        .includes(busqueda.trim().toLowerCase()) ||
      fila.identificador
        ?.trim()
        .toLowerCase()
        .includes(busqueda.trim().toLowerCase()) ||
      fila.email?.trim().toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  return (
    <>
      <Buscador onSearch={setBusqueda} />

      <Tablageneral
        columnas={columnas}
        filas={filasFiltradas}
        claves={claves}
        acciones={(fila) => (
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <Boton action="editar" onClick={() => editar(fila.id)} />
            <Boton action="eliminar" onClick={() => eliminar(fila.id)} />
          </div>
        )}
      />

      <div className="d-flex justify-content-end mt-3">
        <Boton action="agregar" onClick={abrirModal} />
      </div>

      <FormNuevoCliente
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarJuicios}
        itemEditar={itemEditar}
      />
    </>
  );
};

export default JuiciosAbog;
