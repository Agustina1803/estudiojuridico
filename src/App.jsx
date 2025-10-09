import { useState } from "react";
import { Button } from "react-bootstrap";
import FormNuevaTarea from "./components/FormNuevaTarea";
import FormNuevoCliente from "./components/FormNuevoCliente";
import "./App.css";



function App() {
  const [mostrarTarea, setMostrarTarea] = useState(false);
  const [mostrarCliente, setMostrarCliente] = useState(false);

  return (
    <div className="container mt-4">
      <h1>Gestión de Tareas</h1>

      <div className="d-flex gap-2">
        <Button variant="primary" onClick={() => setMostrarTarea(true)}>
          Agregar Tarea
        </Button>
        <Button variant="success" onClick={() => setMostrarCliente(true)}>
          Agregar Cliente
        </Button>
      </div>

      <FormNuevaTarea
        mostrar={mostrarTarea}
        cerrar={() => setMostrarTarea(false)}
      />

      <FormNuevoCliente
        mostrar={mostrarCliente}
        cerrar={() => setMostrarCliente(false)}
      />
    </div>
  );
}
export default App;
