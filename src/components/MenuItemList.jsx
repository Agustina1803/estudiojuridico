import { ListGroup } from 'react-bootstrap';

const menuItems = {
  admin: [
    { label: '🏠 Inicio', key: 'inicio' },
    { label: 'Gestión', key: 'gestion' },
    { label: '👥 Usuarios', key: 'usuarios' },
    { label: '⚖️ Abogados', key: 'abogados' },
    { label: '📋 Secretaría', key: 'secretaria' },
    { label: 'Administración', key: 'administracion' },
    { label: '📂 Documentos', key: 'documentos' },
    { label: '📊 Reportes', key: 'reportes' },
    { label: '⚙️ Configuración', key: 'configuracion' }
  ],

  secretaria: [
    { label: '🏠 Inicio', key: 'inicio' },
    { label: '📅 Agenda', key: 'agenda' },
    { label: '👥 Clientes', key: 'clientes' },
    { label: '📂 Documentos', key: 'documentos' },
    { label: '✅ Tareas', key: 'tareas' },
    { label: '💰 Facturación', key: 'facturacion' },
    { label: '📊 Informes', key: 'informes' }
  ],

  abogado: [
    { label: '🏠 Inicio', key: 'inicio' },
    { label: '📅 Agenda', key: 'agenda' },
    { label: '👥 Clientes', key: 'clientes' },
    { label: '📂 Documentos', key: 'documentos' },
    { label: '✅ Tareas', key: 'tareas' },
    { label: '💰 Facturación', key: 'facturacion' },
    { label: '📊 Informes', key: 'informes' },
    { label: '📑 Juicios', key: 'juicios' }
  ]
};

const MenuItemList = ({ pagina, ejecutar }) => {
  const items = menuItems[pagina] || [];

  return (
    <ListGroup variant="flush">
      {items.map(({ label, key }) => (
        <ListGroup.Item
          key={key}
          action
          onClick={() => ejecutar(key)}
          className="d-flex align-items-center gap-2"
        >
          {label}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default MenuItemList;
