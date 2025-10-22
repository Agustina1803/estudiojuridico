<<<<<<< Updated upstream
import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
=======
import { useState, useEffect } from "react";
>>>>>>> Stashed changes
import { GoogleGenAI } from "@google/genai";
import "../styles/chatCentral.css"; 


const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey: API_KEY });


export default function ChatCentral() {
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(false);
<<<<<<< Updated upstream
  const chatRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [mensajes]);

=======
  const [chatSession, setChatSession] = useState(null);

  
  useEffect(() => {
    const instruction =
      "Eres MARIO, abogado especializado en Derecho Argentino y respondes formalmente.";

    try {
      if (!chatSession) {
        const chat = genAI.chats.create({
          model: "gemini-2.5-flash",
          config: { systemInstruction: instruction },
        });
        setChatSession(chat);
      }
    } catch (error) {
      console.error("Error al iniciar chat:", error);
    }
  }, []);

 
>>>>>>> Stashed changes
  const enviar = async () => {
    if (!texto.trim() || cargando) return;

<<<<<<< Updated upstream
    const nuevos = [...mensajes, { role: "user", content: texto }];
    setMensajes(nuevos);
=======
    const mensajeUsuario = { role: "user", content: texto };
    const historialActualizado = [...mensajes, mensajeUsuario];

    setMensajes(historialActualizado);
>>>>>>> Stashed changes
    setTexto("");
    setCargando(true);

    try {
<<<<<<< Updated upstream
      const res = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: texto,
      });

     const respuesta = res.text; 
        "Sin respuesta de Gemini.";

      setMensajes([...nuevos, { role: "model", content: respuesta }]);
    } catch {
      setMensajes([...nuevos, { role: "model", content: "Error al conectar con la IA." }]);
=======
      const res = await chatSession.sendMessage({
        message: mensajeUsuario.content,
      });
      const respuesta = res.text || "Error: Sin respuesta.";

      setMensajes([
        ...historialActualizado,
        { role: "model", content: respuesta },
      ]);
    } catch (error) {
      console.error("Error de la API:", error);
      setMensajes([
        ...historialActualizado,
        { role: "model", content: "Lo siento, hubo un error de conexión." },
      ]);
>>>>>>> Stashed changes
    } finally {
      setCargando(false);
    }
  };

  return (
<<<<<<< Updated upstream
    <div className="d-flex flex-column p-3 border-start border-end bg-white h-100">
      <div
        ref={chatRef}
        className="flex-grow-1 mb-3 p-3 border rounded bg-light"
        style={{ overflowY: "auto", minHeight: "300px" }}
      >
        {mensajes.map((m, i) => (
          <div key={i} className={`d-flex ${m.role === "user" ? "justify-content-end" : "justify-content-start"}`}>
            <div
              className="p-2 my-1 rounded shadow-sm"
              style={{
                maxWidth: "75%",
                background: m.role === "user" ? "#0d6efd" : "#e9ecef",
                color: m.role === "user" ? "white" : "black",
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
        {cargando && <div className="text-muted fst-italic mt-2">🤖 Escribiendo...</div>}
      </div>

      <div className="input-group">
=======
    <div className="chat-container">
    
      <div className="chat-area">
        {mensajes.length === 0 && (
          <div className="chat-placeholder">Inicia una conversación.</div>
        )}

        {mensajes.map((m, i) => (
          <div
            key={i}
            className={`mensaje ${m.role === "user" ? "usuario" : "mario"}`}
          >
            {m.content}
          </div>
        ))}

        {cargando && <div className="escribiendo">Escribiendo...</div>}
      </div>

     
      <div className="input-area">
>>>>>>> Stashed changes
        <textarea
          placeholder="Escribe tu mensaje..."
          value={texto}
          disabled={cargando}
          onChange={(e) => setTexto(e.target.value)}
<<<<<<< Updated upstream
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), enviar())}
        />
        <button className="btn btn-primary" onClick={enviar} disabled={cargando}>
          {cargando ? <span className="spinner-border spinner-border-sm"></span> : "Enviar"}
=======
          onKeyDown={(e) =>
            e.key === "Enter" && !e.shiftKey && (e.preventDefault(), enviar())
          }
        />
        <button
          onClick={enviar}
          disabled={cargando || !chatSession}
          className="btn-enviar"
        >
          {cargando ? "Cargando..." : "Enviar"}
>>>>>>> Stashed changes
        </button>
      </div>
    </div>
  );
}
