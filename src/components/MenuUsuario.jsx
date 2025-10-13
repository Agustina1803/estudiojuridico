import { useState } from "react";
import MenuLateral from "./MenuLateral";
import { menues } from "../datos/menus";

const MenuUsuario = ({ tipoUsuario, onSeleccionar }) => {
  // menu segun el tipo de usuario (admin, abogado, secretaria)
  const menuSeleccionado = menues[tipoUsuario];

  // Estado interno para resaltar el ítem activo
  const [activo, setActivo] = useState("inicio");

  // Maneja el clic en cada opcion
  const manejarSeleccion = (key) => {
    setActivo(key);
    if (onSeleccionar) onSeleccionar(key);
  };

  return (
    <div
      className="menu-usuario border-end bg-light d-flex flex-column"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <MenuLateral
        tipo={menuSeleccionado}
        onSeleccionar={manejarSeleccion}
        activo={activo}
      />
    </div>
  );
};

export default MenuUsuario;
