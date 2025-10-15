import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from "./shared/footer.jsx";
import { LoginPages } from './pages/LoginPages'
import { AdminPages } from './pages/AdminPages'
import { AbogPages } from './pages/AbogPages'
import { SecrePages } from './pages/SecrePages'
import  ErrorPages  from './pages/ErrorPages'
import { useState } from 'react';
import ProteccionRutas from './routers/ProteccionRutas.jsx';

function App() {
const usuarioSessionStorage = JSON.parse(sessionStorage.getItem('userKey')) || false
const [usuariorLogeado, setUsuarioLogeado] = useState(usuarioSessionStorage)

  return (
    <BrowserRouter>
      <div className="app-layout">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LoginPages setUsuarioLogeado={setUsuarioLogeado} />} />
            <Route path="/admin" element={<ProteccionRutas setUsuarioLogeado={setUsuarioLogeado} ></ProteccionRutas>}>
            <Route index element={<AdminPages/>}></Route>
            </Route>
            <Route path="/abog" element={<ProteccionRutas setUsuarioLogeado={setUsuarioLogeado} ></ProteccionRutas>}>
            <Route index element={<AbogPages/>}></Route>
            </Route>
             <Route path="/secre" element={<ProteccionRutas setUsuarioLogeado={setUsuarioLogeado} ></ProteccionRutas>}>
            <Route index element={<SecrePages/>}></Route>
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
