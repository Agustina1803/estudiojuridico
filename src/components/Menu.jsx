import { Nav, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../styles/Menu.css';



import {
    FaHome,
    FaUser,
    FaBalanceScale,
    FaUsers,
    FaFileAlt,
    FaChartBar,
    FaCog,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaFolder
} from 'react-icons/fa';

const Menu = ({ role }) => {
    const menus = () => {
        switch (role) {
            case 'admin':
                return [
                    { to: 'inicioadmi', label: 'Inicio', icon: <FaHome /> },
                    { to: 'usuariosadmi', label: 'Usuarios', icon: <FaUsers /> },
                    { to: 'abogadosadmi', label: 'Abogados', icon: < FaBalanceScale /> },
                    { to: 'secretarioadmi', label: 'Secretario/a', icon: <FaFileAlt /> },
                    { to: 'documentosadmi', label: 'Documentos', icon: <FaFolder /> },
                    { to: 'reportesadmi', label: 'Reportes', icon: <FaChartBar /> },
                    { to: 'configuracionadmi', label: 'Configuración', icon: <FaCog /> },
                ];
            case 'abog':
                return [
                    { to: 'inicioabog', label: 'Inicio', icon: <FaHome /> },
                    { to: 'agendaabog', label: 'Agenda', icon: <FaCalendarAlt /> },
                    { to: 'clienteabog', label: 'Cliente', icon: <FaUsers /> },
                    { to: 'documentoabog', label: 'Documento', icon: <FaFolder /> },
                    { to: 'tareasabog', label: 'Tareas', icon: <FaFolder /> },
                    { to: 'facturacionabog', label: 'Facturación', icon: <FaMoneyBillWave /> },
                    { to: 'informeabog', label: 'Informe', icon: <FaChartBar /> },
                    { to: 'juiciosabog', label: 'Juicios', icon: <FaBalanceScale /> },
                ];
            case 'secre':
                return [
                    { to: 'iniciosecre', label: 'Inicio', icon: <FaHome /> },
                    { to: 'agendasecre', label: 'Agenda', icon: <FaCalendarAlt /> },
                    { to: 'clientesecre', label: 'Cliente', icon: <FaUser /> },
                    { to: 'documentossecre', label: 'Documentos', icon: <FaFolder /> },
                    { to: 'tareassecre', label: 'Tareas', icon: <FaFolder /> },
                    { to: 'facturacionsecre', label: 'Facturación', icon: <FaMoneyBillWave /> },
                    { to: 'informessecre', label: 'Informes', icon: <FaChartBar /> },
                ];
            default:
                return [];
        }
    }

    const menuItems = menus();


    return (


        <Card className=' border-primary shadow '>
            <Card.Header className='text-center '><h3 className='fw-bold h4'>Menu</h3>
            </Card.Header>
            <Card.Body className='p-0'>
                <Nav className='flex-column p-0 m-0'>
                    {menuItems.map((item) => (
                        <Nav.Link
                            as={NavLink}
                            to={item.to}
                            key={item.to}
                            className="d-flex align-items-center py-3 px-4 border-bottom text-decoration-none navhover "
                        >
                            <span className="me-3">{item.icon}</span>
                            {item.label}
                        </Nav.Link>
                    ))}
                </Nav>

            </Card.Body>
        </Card >
    )

}
export default Menu;