const MenuLateral = ({ tipo, onSeleccionar }) => {
  

  const { titulo, items } = tipo;

  return (
    <aside className="p-3 bg-light border-end">
      <header className="styloHeader mb-3 bg-dark text-white p-2 rounded">
        <h2 className="h5 text-capitalize mb-0">Menú {titulo}</h2>
      </header>

      <ul className="list-group">
  {items.map((item) => (
    <button
      key={item.key}
      type="button"
      className="list-group-item list-group-item-action text-start mb-1"
      onClick={() => onSeleccionar(item.key)}
    >
      {item.icono} {item.nombre}
    </button>
  ))}
</ul>

    </aside>
  );
};

export default MenuLateral;
