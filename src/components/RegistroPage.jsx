// src/assets/Components/RegistroPage.jsx
import { FloatingLabel, Form, Button } from 'react-bootstrap';

export function RegistroPage() {
  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Registro</h2>
      <Form>
        <FloatingLabel controlId="floatingEmail" label="Correo electrónico" className="mb-3">
          <Form.Control type="email" placeholder="nombre@ejemplo.com" />
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3">
          <Form.Control type="password" placeholder="Contraseña" />
        </FloatingLabel>

        <Button variant="primary" type="submit" className="w-100">
          Registrarse
        </Button>
      </Form>
    </div>
  )
};

