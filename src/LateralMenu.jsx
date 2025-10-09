import { useMemo, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const LateralMenu = ({ onSelect, title = 'Panel principal' }) => {
  const menuItems = useMemo(
    () => [
      { id: 'menu', icon: '📋', label: 'Menú' },
      { id: 'inicio', icon: '🏠', label: 'Inicio' },
      { id: 'agenda', icon: '📅', label: 'Agenda' },
      { id: 'clientes', icon: '👥', label: 'Clientes' },
      { id: 'documentos', icon: '📂', label: 'Documentos' },
      { id: 'tareas', icon: '✅', label: 'Tareas' },
      { id: 'facturacion', icon: '💰', label: 'Facturación' },
      { id: 'informes', icon: '📊', label: 'Informes' }
    ],
    []
  );

  const [activeItem, setActiveItem] = useState(menuItems[0].id);



  const handleSelect = (item) => {
    setActiveItem(item.id);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <aside className="d-flex flex-column h-100 bg-light border-end">
      <div className="p-3 border-bottom">
        <h4 className="mb-0">{title}</h4>
        <small className="text-muted">Selecciona una opción para continuar</small>
      </div>

      <ListGroup variant="flush" className="flex-grow-1">
        {menuItems.map((item) => (
          <ListGroup.Item
            key={item.id}
            action
            active={activeItem === item.id}
            onClick={() => handleSelect(item)}
            className="d-flex align-items-center gap-2"
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </aside>
  );
};

export default LateralMenu;
