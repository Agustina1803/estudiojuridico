import Container from "react-bootstrap/Container";
import { Nav, Navbar, Button } from "react-bootstrap/Nav";
import "../styles/navBarHeader.css";
import { useNavigate } from "react-router-dom";

const NavBarHeader = () => {
  const navigate = useNavigate();
  const cerrarSesion = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="styloHeader" variant="dark">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button className="botonCerrarSesion" onClick={cerrarSesion}>
              Cerrar sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarHeader;
