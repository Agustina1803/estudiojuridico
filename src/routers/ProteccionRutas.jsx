import React from "react";
import { Navigate, Outlet } from "react-router";

const ProteccionRutas = ({ usuarioLogeado }) => {
  if (!usuarioLogeado) {
    return <Navigate to={"*"} />;
  }
  return <Outlet />;
};

export default ProteccionRutas;
