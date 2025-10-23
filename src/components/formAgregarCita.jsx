import { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";

const FormNuevaCita = ({ show, onHide, onGuardar }) => {
 const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    cliente: "",
    abogado: "Dra. Gómez",
    tipoEvento: "Audiencia",
    notas: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      fecha: "",
      hora: "",
      cliente: "",
      abogado: "Dra. Gómez",
      tipoEvento: "Audiencia",
      notas: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const camposObligatorios = ["fecha", "hora", "cliente", "notas"];
    const incompletos = camposObligatorios.some(
      (campo) => formData[campo].trim() === ""
    );

   

    const nuevaCita = [
      Date.now(),
      formData.fecha,
      formData.hora,
      formData.cliente,
      formData.abogado,
      formData.tipoEvento,
      formData.notas,
    ];

    onGuardar(nuevaCita); 
    setShowSuccess(true);
    setShowError(false);
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    setShowSuccess(false);
    setShowError(false);
    onHide(); // ✅ cierra desde el padre
  };
  return (
    <>
  

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showSuccess && (
            <Alert
              variant="success"
              onClose={() => setShowSuccess(false)}
              dismissible
            >
              ¡La cita fue agregada exitosamente!
            </Alert>
          )}
          {showError && (
            <Alert
              variant="danger"
              onClose={() => setShowError(false)}
              dismissible
            >
              Por favor completá todos los campos obligatorios.
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="fecha">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="hora">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control
                    type="time"
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="cliente" className="mt-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="abogado" className="mt-3">
              <Form.Label>Abogado asignado</Form.Label>
              <Form.Select
                name="abogado"
                value={formData.abogado}
                onChange={handleChange}
              >
                <option value="Dra. Gómez">Dra. Gómez</option>
                <option value="Dr. Pérez">Dr. Pérez</option>
                <option value="Dra. Martínez">Dra. Martínez</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="tipoEvento" className="mt-3">
              <Form.Label>Tipo de evento</Form.Label>
              <Form.Select
                name="tipoEvento"
                value={formData.tipoEvento}
                onChange={handleChange}
              >
                <option value="Audiencia">Audiencia</option>
                <option value="Consulta">Consulta</option>
                <option value="Reunión">Reunión</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="notas" className="mt-3">
              <Form.Label>Notas</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notas"
                value={formData.notas}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="secondary"
                onClick={handleCancel}
                className="me-2"
              >
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FormNuevaCita;