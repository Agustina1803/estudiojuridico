import React from 'react'
import Tablageneral from './tablageneral';
import { useState } from 'react';


const Testabla = () => {
     const columnas = ["Nombre", "Apellido", "DNI"];
  const [filas, setFilas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaFila = [formData.nombre, formData.apellido, formData.dni];
    setFilas([...filas, nuevaFila]);
    setFormData({ nombre: "", apellido: "", dni: "" });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Formulario de prueba</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          required
        />
        <input
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          placeholder="DNI"
          required
        />
        <button type="submit">Agregar fila</button>
      </form>

      <h2>Tabla generada</h2>
      <Tablageneral columnas={columnas} filas={filas} />
    </div>
  );
}

export default Testabla;