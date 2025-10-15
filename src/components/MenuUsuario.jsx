import { useState } from "react";
import MenuLateral from "./MenuLateral";
import { menues } from "../datos/menus";

const MenuUsuario = ({ tipoUsuario, onSeleccionar }) => {
  const menuSeleccionado = menues[tipoUsuario];
  const [activo, setActivo] = useState("inicio");

  const manejarSeleccion = (key) => {
    setActivo(key);
    if (onSeleccionar) onSeleccionar(key);
  };

  return (
    <MenuLateral
      tipo={menuSeleccionado}
      onSeleccionar={manejarSeleccion}
      activo={activo}
    />
  );
};

export default MenuUsuario;
