import { Navbar, Nav, Card, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styles/Menu.css";
import { useState } from "react";

import {
  FaHome,
  FaUser,
  FaBalanceScale,
  FaUsers,
  FaChartBar,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaFolder,
} from "react-icons/fa";

const Menu = ({ role }) => {
  const menus = () => {
    switch (role) {
      case "admin":
        return [
          { to: "inicioadmi", label: "Inicio", icon: <FaHome /> },
          { to: "usuariosadmi", label: "Usuarios", icon: <FaUsers /> },
          { to: "documentosadmi", label: "Documentos", icon: <FaFolder /> },
          { to: "reportesadmi", label: "Reportes", icon: <FaChartBar /> },
        ];
      case "abog":
        return [
          { to: "inicioabog", label: "Inicio", icon: <FaHome /> },
          { to: "agendaabog", label: "Agenda", icon: <FaCalendarAlt /> },
          { to: "clienteabog", label: "Cliente", icon: <FaUsers /> },
          { to: "documentoabog", label: "Documento", icon: <FaFolder /> },
          { to: "tareasabog", label: "Tareas", icon: <FaFolder /> },
          {
            to: "facturacionabog",
            label: "Facturación",
            icon: <FaMoneyBillWave />,
          },
          { to: "juiciosabog", label: "Juicios", icon: <FaBalanceScale /> },
        ];
      case "secre":
        return [
          { to: "iniciosecre", label: "Inicio", icon: <FaHome /> },
          { to: "agendasecre", label: "Agenda", icon: <FaCalendarAlt /> },
          { to: "clientesecre", label: "Cliente", icon: <FaUser /> },
          { to: "documentossecre", label: "Documentos", icon: <FaFolder /> },
          { to: "tareassecre", label: "Tareas", icon: <FaFolder /> },
          {
            to: "facturacionsecre",
            label: "Facturación",
            icon: <FaMoneyBillWave />,
          },
        ];
      default:
        return [];
    }
  };

  const menuItems = menus();

  return (
 <Navbar expand="lg" className="h-100 flex-column">
      <Container  className="mb-3">
        <Navbar.Toggle aria-controls="menu-collapse" className="my-2" />
        <Navbar.Collapse id="menu-collapse">
          <Card className="border-primary shadow w-100">
            <Card.Header className="text-center">
              <h3 className="fw-bold h4">Menu</h3>
            </Card.Header>
            <Card.Body className="p-0">
              <Nav className="flex-column p-0 m-0 w-100">
                {menuItems.map((item) => (
                  <NavLink
                    to={item.to}
                    key={item.to}
                    className="align-items-center py-3 px-4 border-bottom text-decoration-none navhover d-flex w-100"
                  >
                    <span className="me-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}
              </Nav>
            </Card.Body>
          </Card>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Menu;
