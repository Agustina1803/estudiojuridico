import { Button } from 'react-bootstrap';
import {
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaPaperPlane
} from 'react-icons/fa';

const actionMap = {
  ver: { icon: <FaEye />, variant: 'info', label: 'Ver' },
  editar: { icon: <FaEdit />, variant: 'warning', label: 'Editar' },
  eliminar: { icon: <FaTrash />, variant: 'danger', label: 'Eliminar' },
  agregar: { icon: <FaPlus />, variant: 'success', label: 'Agregar' },
  enviar: { icon: <FaPaperPlane />, variant: 'primary', label: 'Enviar' },
  cerrar: { icon: <FaSignOutAlt />, variant: 'danger', label: 'Cerrar sesión' },
  iniciar: { icon: <FaSignOutAlt />, variant: 'success', label: 'Iniciar sesión' }
};

const Boton = ({
  action,
  onClick,
  type = 'button'
}) => {
  const config = actionMap[action];

  if (!config) {
    console.warn(`Acción "${action}" no está definida en actionMap`);
    return null;
  }

  return (
    <Button
      variant={config.variant}
      onClick={onClick}
      type={type}
      className="d-flex align-items-center gap-2"
    >
      <span>{config.icon}</span>
      {config.label}
    </Button>
  );
};

export default Boton;
