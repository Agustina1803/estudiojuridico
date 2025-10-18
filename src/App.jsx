import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginPages } from "./pages/LoginPages";
import { useState } from "react";
import LayoutsUser from "./layouts/LayoutsUser.jsx";
import { AdminPages } from "./pages/AdminPages";
import { AbogPages } from "./pages/AbogPages";
import { SecrePages } from "./pages/SecrePages";
{
  /* import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./shared/footer.jsx";


import ErrorPages from "./pages/ErrorPages";
import { useState } from "react";
import ProteccionRutas from "./routers/ProteccionRutas.jsx";*/
}

function App() {
  const usuarioSessionStorage = sessionStorage.getItem("user") || null;
  const [usuariorLogeado, setUsuarioLogeado] = useState(usuarioSessionStorage);
  console.log("Usuario logeado en App.jsx:", usuariorLogeado);
  return (
    <BrowserRouter>
      {/* <div className="app-layout">
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<LoginPages setUsuarioLogeado={setUsuarioLogeado} />}
            />

            <Route
              element={<ProteccionRutas usuarioLogeado={usuariorLogeado} />}
            >
              <Route path="/admin" element={<AdminPages />} />
              <Route path="/abog" element={<AbogPages />} />
              <Route path="/secre" element={<SecrePages />} />
            </Route>

            <Route path="*" element={<ErrorPages />} />
          </Routes>
        </main>
        <Footer />
      </div> */}
      <Routes>
        <Route
          path="/"
          element={<LoginPages setUsuarioLogeado={setUsuarioLogeado} />}
        />
        <Route element={<LayoutsUser usuariorLogeado={usuariorLogeado} />}>
          <Route path="/administrador" element={<AdminPages />} />
          <Route path="/abog/*" element={<AbogPages />} />
          <Route path="/secre/*" element={<SecrePages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
