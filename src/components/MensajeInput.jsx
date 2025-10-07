import { useState } from 'react';
import Boton from './boton'; 

const EntradaMensaje = () => {
  const [texto, setTexto] = useState('');

  const manejarCambio = (evento) => {
    setTexto(evento.target.value);
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    console.log("Mensaje a enviar:", texto);
    setTexto('');
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Escribe tu mensaje aquí..."
          value={texto}
          onChange={manejarCambio}
        />
        <Boton action="enviar" type="submit" />
      </div>
    </form>
  );
};

export default EntradaMensaje;
