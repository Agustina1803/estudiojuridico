import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatCentral = () => {
  const [mensajes, setMensajes] = useState([]);
  const [mensajeNuevo, setMensajeNuevo] = useState("");

  const enviarMensaje = () => {
    if (mensajeNuevo.trim() === "") return;
    setMensajes([...mensajes, mensajeNuevo]);
    setMensajeNuevo("");
  };

  return (
    <div className="d-flex flex-column p-3 max-vh-100 border-start border-end bg-white ">
      {/* Área de respuestas */}
      <div
        id="chat"
        className="flex-grow-1 mb-3 p-3 border rounded bg-light"
        style={{ overflowY: "auto", minHeight: "300px" }}
      >
        
      </div>

      {/* Entrada de mensaje */}
      <div className="input-group">
        <textarea
          className="form-control"
          placeholder="Escribe tu mensaje..."
          rows="2"
          required
          value={mensajeNuevo}
          onChange={(e) => setMensajeNuevo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && enviarMensaje()}
        ></textarea>
        <button className="btn btn-primary" type="button" onClick={enviarMensaje}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatCentral;
