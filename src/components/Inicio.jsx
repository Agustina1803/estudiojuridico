import ChatCentral from "./ChatCentral";
import "bootstrap/dist/css/bootstrap.min.css";

const Inicio = () => {
  

  return (
    <div className="container-fluid">
      {/* Chat central */}
      <div
        className="col-lg-6 col-md-8 col-sm-12 bg-white d-flex flex-column"
        style={{
          height: "100vh",
          overflowY: "auto",
          backgroundColor: "#ffffff",
        }}
      >
        <ChatCentral />
      </div>
    </div>
  );
};

export default Inicio;
