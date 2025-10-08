// src/assets/Components/RegistroPage.jsx
import { FloatingLabel, Form, Button, Card } from 'react-bootstrap';
import '../styles/RegistroPage.css';
import { useForm } from 'react-hook-form';

export function RegistroPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <Card border="primary" className='FormRegistro'>
      <div>
        <h3 className='text-center'>Iniciar Sesión</h3>
      </div>
      <Form onSubmit={handleSubmit()}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" {...register("Email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
              message: "El formato es inválido",
            }
          })} />
          <Form.Text className="text-danger">
            {errors.Email?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Password" 
          {...register("Password", {
            required: "La contraseña es obligatorio",
            pattern: {
              value: /^(?=.\d)(?=.[\u0021-\u002b\u003c-\u0040])(?=.[A-Z])(?=.[a-z])\S{8,16}$/,
              message: "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico",
            }
          })} />
          <Form.Text className="text-danger">
            {errors.Password?.message}
          </Form.Text>
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

