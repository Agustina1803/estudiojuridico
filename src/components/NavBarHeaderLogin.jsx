import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.jpg"; 
import '../styles/navBarHeader.css';

const NavBarHeaderLogin = () => {
  return (
    <Navbar
      
      className="styloHeader"
    >
      <Container fluid className="d-flex justify-content-start align-items-center">
        
        <Navbar.Brand className="ms-3">
          <img
            src={logo}
            alt="Logo del estudio"
            height="45"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBarHeaderLogin;
