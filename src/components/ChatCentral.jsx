import { useState, useEffect } from "react";
import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";
import { ver, editar, eliminar } from "../../utils/AccionesBoton";
import FormNuevoCliente from "../../components/FormNuevoCliente";
import Buscador from "../components/Buscador" // 👈 importamos tu componente de búsqueda

const ClientesSecre = () => {
  const columnas = ["Nº", "Nombre", "DNI / CUIT", "Email", "Teléfono", "Estado"];
  const [filas, setFilas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  // 🔹 Cargar clientes desde localStorage
  useEffect(() => {
    const clientesGuardados = localStorage.getItem("clientes");
    if (clientesGuardados) {
      setFilas(JSON.parse(clientesGuardados));
    }
  }, []);

  // 🔹 Agregar nuevo cliente
  const agregarCliente = (nuevoCliente) => {
    const nuevasFilas = [...filas, nuevoCliente];
    setFilas(nuevasFilas);
    localStorage.setItem("clientes", JSON.stringify(nuevasFilas));
    cerrarModal();
  };

  // 🔹 Filtrar por búsqueda (nombre, DNI o email)
  const filasFiltradas = filas.filter(
    (fila) =>
      fila[1]?.toLowerCase().includes(busqueda.toLowerCase()) ||
      fila[2]?.toLowerCase().includes(busqueda.toLowerCase()) ||
      fila[3]?.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🔹 Manejador para el SearchBar
  const handleSearch = (valor) => {
    setBusqueda(valor);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">👥 Lista de Clientes</h2>

      {/* Componente SearchBar */}
      <div className="mb-3">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Tabla general */}
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

      {/* Botón agregar cliente */}
      <div className="d-flex justify-content-end mt-3">
        <Boton action="agregar" onClick={abrirModal} />
      </div>

      {/* Modal para agregar cliente */}
      <FormNuevoCliente
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agregarCliente}
      />
    </div>
  );
};

export default ClientesSecre;
