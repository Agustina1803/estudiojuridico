import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";
import { ver, editar, eliminar } from "../../utils/AccionesBoton";
import FormNuevoCliente from "../../components/FormNuevoCliente";
import Buscador from "../../components/Buscador";
import { useState, useEffect } from "react";

const ClientesSecre = () => {
  const columnas = ["Nº", "Nombre", "DNI / CUIT", "Email", "Teléfono", "Estado"];
  const [filas, setFilas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  useEffect(() => {
    const clientesGuardados = localStorage.getItem("clientes");
    if (clientesGuardados) {
      setFilas(JSON.parse(clientesGuardados));
    }
  }, []);

  const agregarCliente = (nuevoCliente) => {
    const nuevasFilas = [...filas, nuevoCliente];
    setFilas(nuevasFilas);
    localStorage.setItem("clientes", JSON.stringify(nuevasFilas));
    cerrarModal();
  };

  const filasFiltradas = filas.filter(
    (fila) =>
      fila[1]?.toLowerCase().includes(busqueda.toLowerCase()) ||
      fila[2]?.toLowerCase().includes(busqueda.toLowerCase()) ||
      fila[3]?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <Buscador onSearch={setBusqueda} />

      <Tablageneral
        columnas={columnas}
        filas={filasFiltradas}
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

      <FormNuevoCliente
        mostrar={mostrarModal}
        cerrar={cerrarModal}
        onGuardar={agregarCliente}
      />
    </>
  );
};

export default ClientesSecre;
