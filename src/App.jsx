import { useState } from "react";
import { Button } from "react-bootstrap";


function App() {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <div className="container mt-4">
      <h1>Subir archivos</h1>
      <Button variant="primary" onClick={() => setMostrarModal(true)}>
        Agregar Archivo
      </Button>
      <FormSubirArchivo
        mostrar={mostrarModal}
        cerrar={() => setMostrarModal(false)}
      />
    </div>
  );
}

export default App;

