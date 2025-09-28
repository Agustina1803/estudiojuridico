import MensajeInput from './MensajeInput';

const ChatWindow = () => {
  return (
   
    <div className="card d-flex flex-column h-100"> 
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Mi Asistente IA</h5>
      </div>
      
      
      <div className="card-body flex-grow-1 overflow-auto">
        <p className="text-muted text-center mt-3">Inicia una conversación...</p>
      </div>

      <div className="card-footer">
        <MensajeInput />
      </div>
    </div>
  );
};

export default ChatWindow;