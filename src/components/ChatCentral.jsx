import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export default function ChatCentral() {
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const chatRef = useRef(null);
  const [chatSession, setChatSession] = useState(null);

  useEffect(() => {
    try {
      if (!chatSession) {
        const chat = genAI.chats.create({
          model: "gemini-2.5-flash",
        });
        setChatSession(chat);
      }
    } catch (error) {
      console.error("Error al inicializar la sesión de chat:", error);
    }
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviar = async () => {
    if (!texto.trim() || cargando || !chatSession) return;

    const mensajeUsuario = { role: "user", content: texto };
    const nuevos = [...mensajes, mensajeUsuario];
    setMensajes(nuevos);
    setTexto("");
    setCargando(true);

    try {
      const res = await chatSession.sendMessage({
        message: mensajeUsuario.content,
      });
      const respuesta = res.text || "Sin respuesta de Gemini.";
      setMensajes([...nuevos, { role: "model", content: respuesta }]);
    } catch (error) {
      console.error("Error al conectar con la IA:", error);
      setMensajes([...nuevos, { role: "model", content: "Error al conectar con la IA." }]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="d-flex flex-column p-3  bg-white" >
      {/* 🔹 Contenedor fijo del chat con scroll interno */}
      <div
        ref={chatRef}
        className="flex-grow-1 mb-3 p-3 border rounded bg-light overflow-auto"
        style={{
          height: "65vh", // altura fija del área de mensajes
          display: "flex",
          flexDirection: "column",
        }}
      >
        {mensajes.length === 0 && (
          <div className="text-center text-muted">Inicia una conversación con Gemini.</div>
        )}

        {mensajes.map((m, i) => (
          <div
            key={i}
            className={`d-flex ${
              m.role === "user" ? "justify-content-end" : "justify-content-start"
            }`}
          >
            <div
              className={`p-2 my-1 rounded shadow-sm ${
                m.role === "user" ? "bg-primary text-white" : "bg-light borde"
              }`}
             
            >
              {m.content}
            </div>
          </div>
        ))}

        {cargando && <div className="text-muted fst-italic mt-2">Escribiendo...</div>}
      </div>

      {/* 🔹 Área de texto fija al final */}
      <div className="input-group">
        <textarea
          className="form-control"
          placeholder="Escribe tu mensaje..."
          value={texto}
          disabled={cargando || !chatSession}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && !e.shiftKey && (e.preventDefault(), enviar())
          }
          style={{
            resize: "none",
            height: "60px",
          }}
        />
        <button
          className="btn btn-primary"
          onClick={enviar}
          disabled={cargando || !chatSession}
        >
          {cargando ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            "Enviar"
          )}
        </button>
      </div>
    </div>
  );
}
