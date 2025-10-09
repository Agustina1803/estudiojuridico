function ChatInterno() {
  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 overflow-auto p-3">

        {/* Mensaje enviado */}
        <div className="d-flex justify-content-end mb-2">
          <div className="bg-primary text-white rounded p-2" style={{ maxWidth: '75%' }}>
            <p className="mb-0">
              Enviando
            </p>
          </div>
        </div>

        {/* Mensaje recibido */}
        <div className="d-flex justify-content-start mb-2">
          <div className="bg-light rounded p-2" style={{ maxWidth: '75%' }}>
            <p className="mb-0">
              Recibiendo
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ChatInterno;