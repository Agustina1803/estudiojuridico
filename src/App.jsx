import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState} from "react";
import { LoginPages } from "./pages/LoginPages";
import LayoutsUser from "./layouts/LayoutsUser";
import ErrorPages from "./pages/ErrorPages";
import InicioAdmi from "./pages/Administrador/InicioAdmi";
import InicioAbog from "./pages/Abogado/InicioAbog";
import InicioSecre from "./pages/Secretario/InicioSecre";
import UsuariosAdmi from "./pages/Administrador/UsuariosAdmi";
import AbogadosAdmi from "./pages/Administrador/AbogadosAdmi";
import SecretarioAdmi from "./pages/Administrador/SecretarioAdmi";
import DocumentosAdmi from "./pages/Administrador/DocumentosAdmi";
import ReportesAdmi from "./pages/Administrador/ReportesAdmi";
import ConfiguracionAdmi from "./pages/Administrador/ConfiguracionAdmi";
import AgendaAbog from "./pages/Abogado/AgendaAbog";
import ClienteAbog from "./pages/Abogado/ClientesAbog";
import DocumentoAbog from "./pages/Abogado/DocumentosAbog";
import TareasAbog from "./pages/Abogado/TareasAbog";
import FacturacionAbog from "./pages/Abogado/FacturacionAbog";
import InformeAbog from "./pages/Abogado/InformesAbog";
import JuiciosAbog from "./pages/Abogado/JuiciosAbog";
import AgendaSecre from "./pages/Secretario/AgendaSecre";
import ClienteSecre from "./pages/Secretario/ClientesSecre";
import DocumentosSecre from "./pages/Secretario/DocumentosSecre";
import TareasSecre from "./pages/Secretario/TareasSecre";
import FacturacionSecre from "./pages/Secretario/FacturacionSecre";
import InformesSecre from "./pages/Secretario/InformesSecre";

function App() {
  const usuarioSessionStorage = sessionStorage.getItem("user") || null;
  const [usuariorLogeado, setUsuarioLogeado] = useState(usuarioSessionStorage);

  console.log("Usuario logeado en App.jsx:", usuariorLogeado);
 
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginPages setUsuarioLogeado={setUsuarioLogeado} />}
        />
        <Route
          path="app"
          element={<LayoutsUser usuariorLogeado={usuariorLogeado} />}
        >

          <Route path="inicioadmi" element={<InicioAdmi />} />
          <Route path="inicioabog" element={<InicioAbog />} />
          <Route path="iniciosecre" element={<InicioSecre />} />
          <Route path="usuariosadmi" element={<UsuariosAdmi />} />
          <Route path="abogadosadmi" element={<AbogadosAdmi />} />
          <Route path="secretarioadmi" element={<SecretarioAdmi />} />
          <Route path="documentosadmi" element={<DocumentosAdmi />} />
          <Route path="reportesadmi" element={<ReportesAdmi />} />
          <Route path="configuracionadmi" element={<ConfiguracionAdmi />} />
          <Route path="agendaabog" element={<AgendaAbog />} />
          <Route path="agendasecre" element={<AgendaSecre />} />
          <Route path="clienteabog" element={<ClienteAbog />} />
          <Route path="clientesecre" element={<ClienteSecre />} />
          <Route path="documentoabog" element={<DocumentoAbog />} />
          <Route path="documentossecre" element={<DocumentosSecre />} />
          <Route path="tareasabog" element={<TareasAbog />} />
          <Route path="tareassecre" element={<TareasSecre />} />
          <Route path="facturacionabog" element={<FacturacionAbog />} />
          <Route path="facturacionsecre" element={<FacturacionSecre />} />
          <Route path="informeabog" element={<InformeAbog />} />
          <Route path="informessecre" element={<InformesSecre />} />
          <Route path="juiciosabog" element={<JuiciosAbog />} />
        </Route>
        <Route path="*" element={<ErrorPages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
