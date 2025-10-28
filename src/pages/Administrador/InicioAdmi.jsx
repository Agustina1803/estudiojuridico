import { Row, Col, Card } from "react-bootstrap";
import UsuariosAdmi from "./UsuariosAdmi";

const InicioAdmi = () => {
  const usuariosGuardadas = JSON.parse(localStorage.getItem("usuarios"));

  const contarUusuario = () => {
    let abogados = 0;
    let secretaria = 0;
    let admin = 0;
    let usuariosActivos = 0;

    usuariosGuardadas.forEach((usuario) => {
      if (usuario.role === "abog") {
        abogados++;
      } else if (usuario.role === "secre") {
        secretaria++;
      } else if (usuario.role === "admin") {
        admin++;
      }
    });
    usuariosActivos = abogados + secretaria + admin;
    return { abogados, secretaria, admin, usuariosActivos };
  };

  const { abogados, secretaria, admin, usuariosActivos } = contarUusuario();
  return (
    <>
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="mt-3 text-center fs-1 bg-primary text-light">
            <Card.Body>
              <Card.Title>Usuarios activos:</Card.Title>
              <Card.Text>{usuariosActivos}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mt-3 text-center fs-1 bg-success text-light">
            <Card.Body>
              <Card.Title>Administradores activos:</Card.Title>
              <Card.Text>{admin}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mt-3 text-center fs-1 bg-warning text-light">
            <Card.Body>
              <Card.Title>Abogados activos:</Card.Title>
              <Card.Text>{abogados}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mt-3 text-center fs-1 bg-info text-light">
            <Card.Body>
              <Card.Title>Secretario/a activos/as:</Card.Title>
              <Card.Text>{secretaria}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default InicioAdmi;
