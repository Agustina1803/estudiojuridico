import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import '../styles/navBarHeader.css';
import { useNavigate } from 'react-router-dom';

export const NavBarHeader = () => {
  const navigate = useNavigate();

  const cerrarSesion = () =>{
    sessionStorage.removeItem("user");
    navigate("/");
  }

  return (
    
    <Navbar expand="lg" className="styloHeader" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button className="botonCerrarSesion" onClick={cerrarSesion}>Cerrar sesión</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
