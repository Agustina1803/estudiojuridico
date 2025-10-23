import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBarHeaderLogin = () => {
  return (
    <Navbar      
      style={{ backgroundColor: "#1E3A5F" }}
      
    >
      <Container fluid className="d-flex justify-content-start align-items-center">
       
        <Navbar.Brand className="text-white fw-bold fs-4 ms-3">
          MI ESTUDIO
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBarHeaderLogin;
