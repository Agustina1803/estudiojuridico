import { useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const FormAgregarCita = ({ show, onHide, onGuardar, itemEditar = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fecha: "",
      hora: "",
      cliente: "",
      abogado: "Dra. Gómez",
      tipoEvento: "Audiencia",
      notas: "",
    },
  });

  useEffect(() => {
    if (itemEditar) {
      Object.entries(itemEditar).forEach(([key, value]) => {
        setValue(key, value || "");
      });
    } else {
      reset();
    }
  }, [itemEditar, setValue, reset]);

  const onSubmit = (data) => {
    const cita = {
      id: itemEditar ? itemEditar.id : uuidv4(),
      ...data,
    };

    Swal.fire({
      icon: "success",
      title: itemEditar ? "¡Cita actualizada!" : "¡Cita agregada!",
      text: itemEditar
        ? "La cita fue actualizada exitosamente."
        : "La cita fue agregada exitosamente.",
      timer: 2000,
      showConfirmButton: false,
    });

    reset();
    onHide();
    onGuardar(cita);
  };

  const handleCancel = () => {
    reset();
    onHide();
  };

  const modalTitle = itemEditar ? "Editar Cita" : "Nueva Cita";
  const submitButtonText = itemEditar ? "Actualizar" : "Guardar";

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="fecha">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  {...register("fecha", {
                    required: "La fecha es obligatoria",
                  })}
                />
                {errors.fecha && (
                  <small className="text-danger">{errors.fecha.message}</small>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="hora">
                <Form.Label>Hora</Form.Label>
                <Form.Control
                  type="time"
                  {...register("hora", {
                    required: "La hora es obligatoria",
                  })}
                />
                {errors.hora && (
                  <small className="text-danger">{errors.hora.message}</small>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="cliente" className="mt-3">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              type="text"
              {...register("cliente", {
                required: "El nombre del cliente es obligatorio",
              })}
            />
            {errors.cliente && (
              <small className="text-danger">{errors.cliente.message}</small>
            )}
          </Form.Group>

          <Form.Group controlId="abogado" className="mt-3">
            <Form.Label>Abogado asignado</Form.Label>
            <Form.Select {...register("abogado")}>
              <option value="Dra. Gómez">Dra. Gómez</option>
              <option value="Dr. Pérez">Dr. Pérez</option>
              <option value="Dra. Martínez">Dra. Martínez</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="tipoEvento" className="mt-3">
            <Form.Label>Tipo de evento</Form.Label>
            <Form.Select {...register("tipoEvento")}>
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
              {...register("notas", {
                required: "Las notas son obligatorias",
              })}
            />
            {errors.notas && (
              <small className="text-danger">{errors.notas.message}</small>
            )}
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={handleCancel} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {submitButtonText}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
  export default FormAgregarCita;