import Tablageneral from '../../components/tablageneral'
import Boton from '../../components/Boton'
import {ver, editar, eliminar} from '../../utils/AccionesBoton'
import FormAgregarCita from '../../components/formAgregarCita'
import { useState, useEffect } from 'react'

const AgendaSecre = () => {
  const columnas = ['Nº','Fecha', 'Hora', 'Cliente', 'Abogado', 'Tipo de Evento', 'Notas'];
  const [filas, setFilas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () =>setMostrarModal(false);

   useEffect(() => {
    const citasGuardadas = localStorage.getItem("citas");
    if (citasGuardadas) {
      setFilas(JSON.parse(citasGuardadas));
    }
  }, []);

  const agregarCita = (nuevaCita) => {
    const nuevasFilas = [...filas, nuevaCita];
    setFilas(nuevasFilas);
    localStorage.setItem("citas", JSON.stringify(nuevasFilas));
    cerrarModal();
  };

  return (
    <>
      <Tablageneral
        columnas={columnas}
        filas={filas}
        acciones={(fila) => (
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <Boton action="ver" onClick={() => ver(fila[0])} />
            <Boton action="editar" onClick={() => editar(fila[0])} />
            <Boton action="eliminar" onClick={() => eliminar(fila[0])} />
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
      />
    </>

  )
}

export default AgendaSecre