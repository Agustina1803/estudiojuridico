import { Navigate, Outlet } from "react-router-dom";

const ProteccionRutas = ({ usuarioLogueado,roleUsuario }) => {
   const usuariosession= localStorage.getItem("user");
   const token = localStorage.getItem("token");
   const usuarioParseado= usuariosession ? JSON.parse(usuariosession) : null;
 if(!usuarioParseado || !token){
    return <Navigate to="/" />
 }
   if (usuarioParseado?.role?.toLowerCase() === roleUsuario.toLowerCase()) {

        return <Outlet />;
    }
    return <Navigate to="/" />;
};

export default ProteccionRutas;