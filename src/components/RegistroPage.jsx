// src/assets/Components/RegistroPage.jsx
import { FloatingLabel, Form, Button, Card } from 'react-bootstrap';
import '../styles/RegistroPage.css'

export function RegistroPage() {
  return (
    <Card border="primary" className='FormRegistro'>
      <Form>
        <div>
          <h3 className='text-center'>Iniciar Sesión</h3>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Recuérdame" />
        </Form.Group>
        <div className='d-flex justify-content-center'>
          <Button variant="primary" type="submit" className='w-100'>
            Iniciar Sesión
          </Button>
        </div >
        <div className='d-flex justify-content-center mt-2'>
        <p>O</p>
        </div>
        <div className='d-flex justify-content-center mb-2'>
          <Button variant="primary" type="submit" className='w-100'>
            Continuar con Google
          </Button>
        </div>
        </Form>

      <a href="#" className='text-center'>Olvidé mi contraseña</a>
    </Card>
  )
};

