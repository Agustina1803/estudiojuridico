import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

const ModalAgregarCita = () => {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    cliente: '',
    abogado: 'Dra. Gómez',
    tipoEvento: 'Audiencia',
    notas: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Cita guardada:', formData);

    // Mostrar alerta de éxito
    setShowAlert(true);

    // Limpiar formulario
    setFormData({
      fecha: '',
      hora: '',
      cliente: '',
      abogado: 'Dra. Gómez',
      tipoEvento: 'Audiencia',
      notas: ''
    });

    // El modal permanece abierto
  };

  const handleCancel = () => {
    setFormData({
      fecha: '',
      hora: '',
      cliente: '',
      abogado: 'Dra. Gómez',
      tipoEvento: 'Audiencia',
      notas: ''
    });
    setShowAlert(false);
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Agregar nueva cita
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAlert && (
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
              ¡La cita fue agregada exitosamente!
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="fecha">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="hora">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control type="time" name="hora" value={formData.hora} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="cliente" className="mt-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control type="text" name="cliente" value={formData.cliente} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="abogado" className="mt-3">
              <Form.Label>Abogado asignado</Form.Label>
              <Form.Select name="abogado" value={formData.abogado} onChange={handleChange}>
                <option value="Dra. Gómez">Dra. Gómez</option>
                <option value="Dr. Pérez">Dr. Pérez</option>
                <option value="Dra. Martínez">Dra. Martínez</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="tipoEvento" className="mt-3">
              <Form.Label>Tipo de evento</Form.Label>
              <Form.Select name="tipoEvento" value={formData.tipoEvento} onChange={handleChange}>
                <option value="Audiencia">Audiencia</option>
                <option value="Consulta">Consulta</option>
                <option value="Reunión">Reunión</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="notas" className="mt-3">
              <Form.Label>Notas</Form.Label>
              <Form.Control as="textarea" rows={3} name="notas" value={formData.notas} onChange={handleChange} />
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="secondary" onClick={handleCancel} className="me-2">Cancelar</Button>
              <Button variant="primary" type="submit">Guardar</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAgregarCita;
