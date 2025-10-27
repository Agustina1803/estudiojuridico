import { useState, useEffect } from "react";
import Tablageneral from "../../components/tablageneral";
import Boton from "../../components/Boton";
import { Modal, Button, Form } from "react-bootstrap";

const DocumentosSecre = () => {
  const columnas = ["Nombre", "Cliente", "Tipo", "Fecha", "Archivo"];
  const [filas, setFilas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoDoc, setNuevoDoc] = useState({
    nombre: "",
    cliente: "",
    tipo: "",
    fecha: "",
    archivo: "",
  });

  // --- Abrir / cerrar modal ---
  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  // --- Cargar documentos almacenados ---
  useEffect(() => {
    const docsGuardados = localStorage.getItem("documentos");
    if (docsGuardados) {
      setFilas(JSON.parse(docsGuardados));
    }
  }, []);

  // --- Agregar nuevo documento ---
  const agregarDocumento = (e) => {
    e.preventDefault();

    if (!nuevoDoc.archivo) {
      alert("Por favor selecciona un archivo antes de subir.");
      return;
    }

    const nuevasFilas = [...filas, nuevoDoc];
    setFilas(nuevasFilas);
    localStorage.setItem("documentos", JSON.stringify(nuevasFilas));
    cerrarModal();

    // Reset
    setNuevoDoc({
      nombre: "",
      cliente: "",
      tipo: "",
      fecha: "",
      archivo: "",
    });
  };

  // --- Eliminar documento ---
  const eliminarDocumento = (nombreDoc) => {
    const docsFiltrados = filas.filter((fila) => fila.nombre !== nombreDoc);
    setFilas(docsFiltrados);
    localStorage.setItem("documentos", JSON.stringify(docsFiltrados));
  };

  // --- Capturar archivo seleccionado ---
  const manejarArchivo = (e) => {
    const archivoSeleccionado = e.target.files[0];
    if (archivoSeleccionado) {
      setNuevoDoc((prev) => ({
        ...prev,
        archivo: archivoSeleccionado.name,
        nombre: prev.nombre || archivoSeleccionado.name,
      }));
    }
  };

  return (
    <>
      <h2 className="mb-4">Gestión de Documentos</h2>

      <Tablageneral
        columnas={columnas}
        filas={filas.map((fila) => [
          fila.nombre,
          fila.cliente,
          fila.tipo,
          fila.fecha,
          fila.archivo,
          <div
            key={fila.nombre}
            className="d-flex gap-2 align-items-center justify-content-center"
          >
            <Boton action="ver" onClick={() => alert("Viendo " + fila.nombre)} />
            <Boton
              action="descargar"
              onClick={() => alert("Descargando " + fila.nombre)}
            />
            <Boton
              action="eliminar"
              onClick={() => eliminarDocumento(fila.nombre)}
            />
          </div>,
        ])}
      />

      <div className="d-flex justify-content-end mt-3">
        <Boton action="agregar" onClick={abrirModal} />
      </div>

      {/* Modal para subir documento */}
      <Modal show={mostrarModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>📤 Subir nuevo documento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={agregarDocumento}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del documento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Contrato_Laboral.pdf"
                value={nuevoDoc.nombre}
                onChange={(e) =>
                  setNuevoDoc({ ...nuevoDoc, nombre: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del cliente"
                value={nuevoDoc.cliente}
                onChange={(e) =>
                  setNuevoDoc({ ...nuevoDoc, cliente: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de documento</Form.Label>
              <Form.Select
                value={nuevoDoc.tipo}
                onChange={(e) =>
                  setNuevoDoc({ ...nuevoDoc, tipo: e.target.value })
                }
                required
              >
                <option value="">Seleccionar</option>
                <option>Demanda</option>
                <option>Contrato</option>
                <option>Escrito</option>
                <option>Poder</option>
                <option>Notificación</option>
                <option>Otro</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={nuevoDoc.fecha}
                onChange={(e) =>
                  setNuevoDoc({ ...nuevoDoc, fecha: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Seleccionar archivo</Form.Label>
              <Form.Control
                type="file"
                onChange={manejarArchivo}
                accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                required
              />
              {nuevoDoc.archivo && (
                <small className="text-muted">
                  Archivo seleccionado: {nuevoDoc.archivo}
                </small>
              )}
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={cerrarModal} className="me-2">
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Subir documento
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DocumentosSecre;
