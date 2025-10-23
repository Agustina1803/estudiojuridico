import NavBarHeaderLogin from "../components/NavBarHeaderLogin";
import { RegistroPage } from "../components/RegistroPage"
import Footer from "../shared/Footer";

export const LoginPages = ({ setUsuarioLogeado }) => {
  return (
    <div className="container-fluid">
      <NavBarHeaderLogin />
      <RegistroPage setUsuarioLogeado={setUsuarioLogeado} />
      <Footer/>
    </div>
  );
};




