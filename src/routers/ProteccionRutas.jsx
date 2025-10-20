import { Navigate, Outlet } from "react-router-dom";

const ProteccionRutas = ({ usuarioLogeado }) => {
  if (!usuarioLogeado) {
    return <Navigate to="*" />;
  }
  return <Outlet />;
};

export default ProteccionRutas;