import { Container, Row, Col } from "react-bootstrap";
import Menu from "../components/Menu";
import Footer from "../shared/footer";
import { NavBarHeader } from "../components/NavBarHeader";
import { Outlet } from "react-router-dom";
import ChatInterno from "../components/ChatInterno";


const LayoutsAdmi = ({usuariorLogeado}) => {
  return (
    <div className="d-flex flex-column vh-100">
      <NavBarHeader></NavBarHeader>
      <main className="flex-grow-1">
        <Container fluid className="my-4">
          <Row>
            <Col md={3} lg={3} className="d-flex align-items-center justify-content-center">
              <Menu role={usuariorLogeado?.role} className="menu"/>
            </Col>
            <Col md={6} lg={6}>
              <Outlet></Outlet>
            </Col>
            <Col md={3} lg={3}>
              <ChatInterno></ChatInterno>
            </Col> 
          </Row>
        </Container>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default LayoutsAdmi;
