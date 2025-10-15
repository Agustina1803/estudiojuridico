import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./shared/footer.jsx";
import { LoginPages } from "./pages/LoginPages";
import { AdminPages } from "./pages/AdminPages";
import { AbogPages } from "./pages/AbogPages";
import { SecrePages } from "./pages/SecrePages";
import ErrorPages from "./pages/ErrorPages";
import { useState } from "react";
import ProteccionRutas from "./routers/ProteccionRutas.jsx";

function App() {
  const usuarioSessionStorage = sessionStorage.getItem("userKey") === "true";
  const [usuariorLogeado, setUsuarioLogeado] = useState(usuarioSessionStorage);

  return (
    <BrowserRouter>
      <div className="app-layout">
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
      </div>
    </BrowserRouter>
  );
}

export default App;
