import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";
import Swal from "sweetalert2";
import FormAgregarCita from "../../components/formAgregarCita";
import { useState, useEffect } from "react";

const AgendaSecre = () => {
  const columnas = ['Nº', 'Fecha', 'Hora', 'Cliente', 'Abogado', 'Tipo de Evento', 'Notas'];
  const claves = ["fecha", "hora", "cliente", "abogado", "tipoEvento", "notas"];
  const tipo = "citas";
  const [filas, setFilas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);

  useEffect(() => {
    const citasGuardadas = localStorage.getItem("citas");
    if (citasGuardadas) {
      setFilas(JSON.parse(citasGuardadas));
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
      title: `¿Eliminar la ${cliente.tipoEvento} del cliente ${cliente.cliente}?`,
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
          text: "La cita  fue eliminada correctamente.",
          icon: "success",
        });
      }
    });
    registrar({
      id: cliente.id,
      nombre: cliente.cliente,
      tipoEvento:"eliminarCita"
    });
  };
  const agregarCita = (cita) => {
    let actualizadas;
    const tipoEvento = itemEditar ? "edicionCita" : "agregarCita";
    if (itemEditar) {
      actualizadas = filas.map((fila) => (fila.id === cita.id ? cita : fila));
    } else {
      actualizadas = [...filas, cita];
    }
    registrar({
      id: cita.id,
      nombre: cita.cliente,
      tipoEvento,
    });
    setFilas(actualizadas);
    localStorage.setItem(tipo, JSON.stringify(actualizadas));
    cerrarModal();
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
          </div>
        )}
      />
      <div className="d-flex justify-content-end mt-3">
        <Boton action="agregar" onClick={abrirModal} />
      </div>
      <FormAgregarCita
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarCita}
        itemEditar={itemEditar}
      />
    </>
  );
};

export default AgendaSecre;
