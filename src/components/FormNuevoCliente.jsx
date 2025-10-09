import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const FormNuevoCliente = ({ mostrar, cerrar }) => {
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  defaultValues: {
    nombre: "",
    identificador: "",
    email: "",
    telefono: "",
    prioridad: "alta"
  }
});

  const crearCliente = (data) => {
    data.id = uuidv4();
    console.log(data);
    reset();
    
  };

  const validarCuit = (cuit) => {
    if (cuit.length !== 11) return false;
    const mult = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    const digitos = cuit.split("").map(Number);
    const suma = mult.reduce((acc, val, i) => acc + val * digitos[i], 0);
    const resto = suma % 11;
    const verificador = resto === 0 ? 0 : resto === 1 ? 9 : 11 - resto;
    return verificador === digitos[10];
  };

  return (
    <Modal show={mostrar} onHide={cerrar}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(crearCliente)}>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre Completo: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Juan Perez"
              {...register("nombre", {
                required: "El nombre del cliente es obligatorio",
                minLength: {
                  value: 10,
                  message:
                    "El nombre del cliente debe tener como minimo 10 caracteres",
                },
                maxLength: {
                  value: 50,
                  message:
                    "El nombre del cliente debe tener como maximo 50 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.nombre?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="identificador">
            <Form.Label>DNI / CUIT :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: 20301234567"
              {...register("identificador", {
                required: "Este campo es obligatorio",
                validate: (value) => {
                  const limpio = value.replace(/-/g, "");
                  const soloNumeros = /^\d{7,11}$/.test(limpio);
                  if (!soloNumeros)
                    return "Debe contener solo números (7 a 11 dígitos)";
                  if (limpio.length === 11 && !validarCuit(limpio)) {
                    return "CUIT/CUIL inválido";
                  }
                  return true;
                },
              })}
              isInvalid={!!errors.identificador}
            />
            <Form.Text className="text-danger">
              {errors.identificador?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ej: juanperez@gmail.com"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value:
                    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                  message: "El formato del email es incorrecto",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="telefono">
            <Form.Label>Telefono:</Form.Label>
            <Form.Control
              type="telefono"
              placeholder="3813005896"
              {...register("telefono", {
                required: "El telefono es obligatorio",
                pattern: {
                  value: /^(?:(?:00)?549?)?0?(?:11|[2368]\d{2})\d{6,8}$/,
                  message: "El formato del telefono es incorrecto",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.telefono?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="prioridad">
            <Form.Label>Prioridad</Form.Label>
            <Form.Select {...register("prioridad")}>
              <option value="alta"> Activo</option>
              <option value="alta"> Inactivo</option>
            </Form.Select>
          </Form.Group>
            <div className="justify-content-end d-flex">
          <Button variant="success" type="submit" className="me-2">
            Guardar
          </Button>
          <Button variant="secondary" onClick={cerrar}>
            Cancelar
          </Button>
        </div>
        </Form>
      
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default FormNuevoCliente;
