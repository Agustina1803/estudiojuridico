import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const FormNuevaTarea = ({ mostrar, cerrar }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      descripcion: "",
      responsable: "Dr.Gómez",
      prioridad: "alta",
      fecha: "",
    },
  });

  const crearNuevaTarea = (data) => {
    data.id = uuidv4();
    console.log(data);
    reset();
  };

  return (
    <Modal show={mostrar} onHide={cerrar}>
      <Modal.Header closeButton>
        <Modal.Title>Nueva Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(crearNuevaTarea)}>
          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Ingrese descripcion"
              {...register("descripcion", {
                required: "La descripcion es obligatoria",
                minLength: {
                  value: 10,
                  message: "La descripcion deber tener al menos 10 caracteres",
                },
                maxLength: {
                  value: 1000,
                  message:
                    "La descripcion no puede exceder los 1000 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.descripcion?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="responsable">
            <Form.Label>Responsable</Form.Label>
            <Form.Select {...register("responsable")}>
              <option value="Dr.Gómez">Dr.Gómez</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="prioridad">
            <Form.Label>Prioridad</Form.Label>
            <Form.Select {...register("prioridad")}>
              <option value="alta"> Alta</option>
              <option value="alta"> Media</option>
              <option value="alta"> Baja</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="fecha">
            <Form.Label>Fecha:</Form.Label>
            <Form.Control
              type="date"
              {...register("fecha", {
                required: "La fecha es obligatorio",
              })}
            />
            <Form.Text className="text-danger">
              {errors.fecha?.message}
            </Form.Text>
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

export default FormNuevaTarea;
