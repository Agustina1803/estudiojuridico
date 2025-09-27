import { Button } from 'react-bootstrap';
import {
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaPaperPlane,
  FaDownload
} from 'react-icons/fa';

const actionMap = {
  ver: { icon: <FaEye />, variant: 'info', label: 'Ver' },
  editar: { icon: <FaEdit />, variant: 'warning', label: 'Editar' },
  eliminar: { icon: <FaTrash />, variant: 'danger', label: 'Eliminar' },
  agregar: { icon: <FaPlus />, variant: 'success', label: 'Agregar' },
  enviar: { icon: <FaPaperPlane />, variant: 'primary', label: 'Enviar' },
  cerrar: { icon: <FaSignOutAlt />, variant: 'danger', label: 'Cerrar sesión' },
  iniciar: { icon: <FaSignOutAlt />, variant: 'success', label: 'Iniciar sesión' },
  descargar: { icon: <FaDownload />, variant: 'secondary', label: 'Descargar' }
};


const Boton = ({
  action,
  onClick,
  type = 'button'
}) => {
  const config = actionMap[action];

  
  return (
    <Button
      variant={config.variant}
      onClick={onClick}
      type={type}
      className="d-flex align-items-center gap-2 ms-1"
    >
      <span>{config.icon}</span>
      {config.label}
    </Button>
  );
};

export default Boton;
