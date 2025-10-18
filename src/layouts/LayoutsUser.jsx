import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Menu from "../components/Menu.jsx";
import Footer from "../shared/footer.jsx";
import { NavBarHeader } from "../components/NavBarHeader.jsx";
import { Outlet } from "react-router-dom";


const LayoutsAdmi = ({usuariorLogeado}) => {
  return (
    <div className="d-flex flex-column vh-100">
      <NavBarHeader></NavBarHeader>
      <main className="flex-grow-1">
        <Container fluid className="my-4">
          <Row>
            <Col md={4} lg={3} className="d-flex align-items-center justify-content-center">
              <Menu role={usuariorLogeado?.role}/>
            </Col>
            <Col md={8} lg={9}>
              <Outlet></Outlet>
            </Col>
            {/* 
            Este componente ChatInterno está comentado para evitar conflictos de espacio en la interfaz.
            <Col md={3}>
              <ChatInterno></ChatInterno>
            </Col> */}
          </Row>
        </Container>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default LayoutsAdmi;
