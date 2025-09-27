import MensajeInput from './MensajeInput';

const ChatWindow = () => {
  return (
    <div className="container mt-4">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Mi Asistente IA</h5>
            </div>
            <div className="card-body" style={{ height: '400px', overflowY: 'auto' }}>
              <p className="text-muted text-center mt-3">Inicia una conversación...</p>
            </div>
            <div className="card-footer">
             
              <MensajeInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;