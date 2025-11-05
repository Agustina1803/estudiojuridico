import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";
import Swal from "sweetalert2";
import FormAltaUsuario from "../Administrador/FormAltaUsuario";
import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";

const UsuariosAdmi = () => {
  const columnas = ["Nº", "Nombre", "Apellido", "Email", "Telefono", "Rol"];
  const claves = ["nombre", "apellido", "email", "telefono", "role"];
  const tipo = "usuarios";
  const [filas, setFilas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busquedaNombreApellido, setNombreApellido] = useState("");

  useEffect(() => {
    const usuariosGuardadas = localStorage.getItem("usuarios");
    if (usuariosGuardadas) {
      setFilas(JSON.parse(usuariosGuardadas));
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
    const usuarios = filas.find((item) => item.id === id);
    setItemEditar(usuarios);
    setMostrarModal(true);
  };

  const eliminar = (id) => {
    const usuarios = filas.find((item) => item.id === id);
    Swal.fire({
      title: `¿Eliminar al ${usuarios.nombre}?`,
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
          text: `El ${usuarios.nombre}  fue eliminada correctamente.`,
          icon: "success",
        });
      }
    });
  };

  const agegarUsuario = (user) => {
    let actualizadas;
    if (itemEditar) {
      actualizadas = filas.map((fila) => (fila.id === user.id ? user : fila));
    } else {
      actualizadas = [...filas, user];
    }
    setFilas(actualizadas);
    localStorage.setItem(tipo, JSON.stringify(actualizadas));
    cerrarModal();
  };

  const filasFiltradas = filas.filter(
    (fila) =>
      busquedaNombreApellido === "" ||
      fila.nombre
        ?.toLowerCase()
        .trim()
        .includes(busquedaNombreApellido.toLowerCase()) ||
      fila.apellido?.trim().includes(busquedaNombreApellido)
  );
  return (
    <>
      <SearchBar
        onSearch={setNombreApellido}
        placeholder="Buscar por nombre o apellido..."
      />

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
      <FormAltaUsuario
        show={mostrarModal}
        onHide={cerrarModal}
        onGuardar={agegarUsuario}
        itemEditar={itemEditar}
      />
    </>
  );
};

export default UsuariosAdmi;
