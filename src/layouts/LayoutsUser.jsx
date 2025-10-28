import { Container, Row, Col } from "react-bootstrap";
import Menu from "../components/Menu";
import Footer from "../shared/footer";
import { NavBarHeader } from "../components/NavBarHeader";
import { Outlet } from "react-router-dom";
import '../styles/layoutsAdmi.css';



const LayoutsAdmi = () => {
  const usuarioLogueado= JSON.parse(sessionStorage.getItem("user"));
  const role = usuarioLogueado?.role.toLowerCase();
  return (
    <div className="d-flex flex-column vh-100">
      <NavBarHeader></NavBarHeader>
      <main className="flex-grow-1">
        <Container fluid className="my-4">
          <Row>
            <Col md={3} lg={3} className="d-flex flex-column">
              <Menu role={role} className="menu"/>
            </Col>
            <Col md={9} lg={9}>
              <Outlet></Outlet>
            </Col>
            {/*  Este componente lo vamos a utilizar para la 3era entrega 
            <Col md={3} lg={3}>
              <ChatInterno></ChatInterno>
            </Col>*/}
          </Row>
        </Container>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default LayoutsAdmi;
