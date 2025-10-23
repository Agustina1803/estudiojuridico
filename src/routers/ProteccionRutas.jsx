import { Navigate, Outlet } from "react-router-dom";

const ProteccionRutas = ({ usuarioLogueado,roleUsuario }) => {
   const usuariosession= sessionStorage.getItem("user");
   const usuarioParseado= usuariosession ? JSON.parse(usuariosession) : null;
  if (usuarioParseado?.role === roleUsuario) {

        return <Outlet />;
    }
    return <Navigate to="/" />;
};

export default ProteccionRutas;