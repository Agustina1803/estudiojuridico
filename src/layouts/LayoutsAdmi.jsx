import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Menu from "../components/Menu";
import ChatInterno from "../components/ChatInterno";
import ChatCentral from "../components/ChatCentral";
import Footer from "../shared/footer.jsx";
import { NavBarHeader } from "../components/NavBarHeader.jsx";


const LayoutsAdmi = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <NavBarHeader></NavBarHeader>
      <main className="flex-grow-1">
        <Container className="my-4 container">
          <Row>
            <Col md={3}>
              <Menu role="admin"/>
            </Col>
            <Col md={9}>
              <ChatCentral></ChatCentral>
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
