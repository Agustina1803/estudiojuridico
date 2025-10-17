import React from 'react'
import {
    FaHome,
    FaUser,
    FaBalanceScale,
    FaUsers,
    FaFileAlt,
    FaChartBar,
    FaCog,
    FaCalendarAlt,
    FaTasks,
    FaMoneyBillWave,
    FaFolder,
    MdCheckCircle,
} from 'react-icons/fa';

const Menu = ({ role }) => {
    const menus = () => {
        switch (role) {
            case 'admin':
                return [
                    { to: '/administrador', label: 'Inicio', icon: <FaHome /> },
                    { to: '/administrador/usuariosadmi', label: 'Usuarios', icon: <FaUsers /> },
                    { to: '/administrador/abogadosadmi', label: 'Abogados', icon: < FaBalanceScale /> },
                    { to: '/administrador/secretarioadmi', label: 'Clientes', icon: <FaFileAlt /> },
                    { to: '/administrador/documentosadmi', label: 'Documentos', icon: <FaFolder /> },
                    { to: '/administrador/reportes', label: 'Reportes', icon: <FaChartBar /> },
                    { to: '/administrador/configuracionadmi', label: 'Configuración', icon: <FaCog /> },
                ];
            case 'abog':
                return [
                    { to: '/abogado', label: 'Inicio', icon: <FaHome /> },
                    { to: '/abogado/agendaabog', label: 'Agenda', icon: <FaCalendarAlt /> },
                    { to: '/abogado/clienteabog', label: 'Cliente', icon: <FaUsers /> },
                    { to: '/abogado/documentoabog', label: 'Documento', icon: <FaFolder /> },
                    { to: '/abogado/tareasabog', label: 'Tareas', icon: <MdCheckCircle /> },
                    { to: '/abogado/facturacionabog', label: 'Facturación', icon: <FaMoneyBillWave /> },
                    { to: '/abogado/informeabog', label: 'Informe', icon: <FaChartBar /> },
                    { to: '/abogado/juiciosabog', label: 'Juicios', icon: <FaBalanceScale /> },
                ];
            case 'secre':
                return [
                  { to: '/secretario', label: 'Inicio', icon: <FaHome /> },
                    { to: '/secretario/agendasecre', label: 'Agenda', icon: <FaCalendarAlt /> },
                    { to: '/secretario/clientesecre', label: 'Cliente', icon: <FaUser /> },
                    { to: '/secretario/documentossecre', label: 'Documentos', icon: <FaFolder /> },
                    { to: '/secretario/tareassecre', label: 'Tareas', icon: <MdCheckCircle/> },
                    { to: '/secretario/facturacionsecre', label: 'Facturación', icon: <FaMoneyBillWave /> },
                    { to: '/secretario/informessecre', label: 'Informes', icon: <FaChartBar /> },
                ];
            default:
                return [];
        }
    }
    return (
         <Card>
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    )

}
export default Menu;