import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    setShowAlert(true);
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <Container style={{ maxWidth: '600px', marginTop: '2rem' }}>
      <h2>Contacto</h2>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          ¡Gracias por tu mensaje! Te responderemos pronto.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tu nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="nombre@ejemplo.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMensaje">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Escribí tu mensaje aquí..."
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default ContactForm;
