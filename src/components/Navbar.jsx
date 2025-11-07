import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export const NavBarHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark px-3">
      <div className="container-fluid">
        {/* 🔹 BOTÓN MENÚ (solo móvil) */}
        <button
          className="btn btn-light me-2 d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#menuLateral"
        >
          <i className="bi bi-list fs-5"></i>
        </button>

        {/* 🔹 LOGO O TÍTULO */}
        <span className="navbar-brand fw-bold">Asistente</span>

        {/* 🔹 BOTÓN CHAT (solo móvil) */}
        <button
          className="btn btn-outline-light ms-auto me-2 d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#chatInterno"
        >
          <i className="bi bi-chat-dots fs-5"></i>
        </button>

        {/* 🔹 BOTÓN CERRAR SESIÓN (visible en todos los tamaños) */}
        <button className="btn btn-outline-light">Cerrar sesión</button>
      </div>
    </nav>
  );
};
