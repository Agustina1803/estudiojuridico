import { BrowserRouter, Routes, Route,} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from "./shared/footer.jsx";
import { LoginPages } from './pages/LoginPages'
import { AdminPages } from './pages/AdminPages'
import { AbogPages } from './pages/AbogPages'
import { SecrePages } from './pages/SecrePages'
import { ErrorPages } from './pages/ErrorPages'



function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LoginPages />} />
            <Route path="/admin" element={<AdminPages />} />
            <Route path="/abog" element={<AbogPages />} />
            <Route path="/secre" element={<SecrePages />} />
            <Route path="*" element={<ErrorPages />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
