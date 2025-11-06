import { Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import "../styles/navBarHeader.css";

const NavBarHeaderLogin = () => {
  return (
    <Navbar className="styloHeader">
      <Container
        fluid
        className="d-flex justify-content-start align-items-center"
      >
        <Navbar.Brand className="ms-3">
          <img
            src={logo}
            alt="Logo estudio jurídico"
            className="logo-header"
            loading="lazy"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBarHeaderLogin;
