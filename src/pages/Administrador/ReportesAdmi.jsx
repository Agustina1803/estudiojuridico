import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { jsPDF } from "jspdf";
import Tablageneral from "../../components/tablageneral";
const RegistroAdmin = () => {
  const columnas = [
    "Nº",
    "Nombre Cliente",
    "Rol de quien lo registro",
    "Tipo de Evento",
    "Fecha",
  ];
  const claves = ["nombre", "rol", "tipoEvento", "fecha"];
  const [filas, setFilas] = useState([]);
  useEffect(() => {
    const movimientos = localStorage.getItem("movimientosSecreAgenda");
    if (movimientos) {
      setFilas(JSON.parse(movimientos));
    }
  }, []);
   useEffect(() => {
    const movimientos = localStorage.getItem("movimientoClienteSecre");
    if (movimientos) {
      setFilas(JSON.parse(movimientos));
    }
  }, []);
  
  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Historial de Movimientos - Agenda", 20, 20);
    doc.setFontSize(12);
    doc.text("Nº", 20, 30);
    doc.text("Nombre Cliente", 30, 30);
    doc.text("Registrado por", 80, 30);
    doc.text("Tipo de Evento", 130, 30);
    doc.text("Fecha", 170, 30);
    let y = 40;
    filas.forEach((mov, index) => {
      doc.text(`${index + 1}`, 20, y);
      doc.text(mov.nombre, 30, y);
      doc.text(mov.rol, 80, y);
      doc.text(mov.tipoEvento, 130, y);
      doc.text(mov.fecha, 170, y);
      y += 10;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save("movimientos_agenda.pdf");
  };
  return (
    <>
      {" "}
      <h3 className="text-center my-3">Registro de Movimientos</h3>{" "}
      <Tablageneral columnas={columnas} filas={filas} claves={claves} />{" "}
      <div className="d-flex justify-content-end mt-3">
        {" "}
        <Button variant="info" onClick={generarPDF}>
          {" "}
          Descargar PDF{" "}
        </Button>{" "}
      </div>{" "}
    </>
  );
};
export default RegistroAdmin;
