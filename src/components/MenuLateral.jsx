const MenuLateral = ({ tipo, onSeleccionar, activo }) => {
  const { titulo, items } = tipo;

  return (
    <aside className="p-3">
      <header className="bg-primary text-white text-center p-2 rounded mb-3">
        <h2 className="h5 mb-0">Menú {titulo}</h2>
      </header>
      <ul className="list-group">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onSeleccionar(item.key)}
            className={`list-group-item list-group-item-action text-start ${
              activo === item.key ? "active" : ""
            }`}
          >
            {item.icono} {item.nombre}
          </button>
        ))}
      </ul>
    </aside>
  );
};

export default MenuLateral;
