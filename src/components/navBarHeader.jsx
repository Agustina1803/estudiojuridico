
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';
import '../styles/navBarHeader.css';



export const NavBarHeader = () => {
  return (
    <Navbar expand="lg" className="styloHeader">
      <Container className=''>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"><Button className="botonCerrarSesion">Cerrar sesion</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
