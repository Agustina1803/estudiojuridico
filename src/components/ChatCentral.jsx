import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export default function ChatCentral() {
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const chatRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [mensajes]);

  const enviar = async () => {
    if (!texto.trim() || cargando) return;

    const nuevos = [...mensajes, { role: "user", content: texto }];
    setMensajes(nuevos);
    setTexto("");
    setCargando(true);

    try {
      const res = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: texto,
      });

     const respuesta = res.text; 
        "Sin respuesta de Gemini.";

      setMensajes([...nuevos, { role: "model", content: respuesta }]);
    } catch {
      setMensajes([...nuevos, { role: "model", content: "Error al conectar con la IA." }]);
    } finally {
      setCargando(false);
    }
  };

  return (
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
        <textarea
          className="form-control"
          placeholder="Escribe tu mensaje..."
          value={texto}
          disabled={cargando}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), enviar())}
        />
        <button className="btn btn-primary" onClick={enviar} disabled={cargando}>
          {cargando ? <span className="spinner-border spinner-border-sm"></span> : "Enviar"}
        </button>
      </div>
    </div>
  );
}
