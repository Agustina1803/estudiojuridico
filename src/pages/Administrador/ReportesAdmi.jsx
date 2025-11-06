import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";

const RegistroAdmin = () => {
  const columnas = ["Nº", "Nombre Cliente", "Tipo de Evento", "Fecha"];
  const claves = ["nombre", "tipoEvento", "fecha"];
  const [filas, setFilas] = useState([]);
  useEffect(() => {
    const agenda =
      JSON.parse(localStorage.getItem("movimientosSecreAgenda")) || [];
    setFilas(agenda);
  }, []);

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Historial de Movimientos - Agenda", 20, 20);
    doc.setFontSize(12);
    doc.text("Nº", 10, 30);
    doc.text("Nombre Cliente", 30, 30);
    doc.text("Tipo de Evento", 100, 30);
    doc.text("Fecha", 150, 30);

    let y = 40;
    filas.forEach((mov, index) => {
      doc.text(`${index + 1}`, 10, y);
      doc.text(mov.nombre, 30, y);
      doc.text(mov.tipoEvento, 110, y);
      doc.text(mov.fecha, 160, y);
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
      <div className="tabla-scroll">
        <Tablageneral columnas={columnas} filas={filas} claves={claves} />
      </div>

      <div className="d-flex justify-content-end mt-3">
        <Boton action="descargarPdf" onClick={() => generarPDF()} />
      </div>
    </>
  );
};
export default RegistroAdmin;
