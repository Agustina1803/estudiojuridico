import { useEffect, useState } from "react";
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
    mode: "all",
    defaultValues: {
      fecha: "",
      hora: "",
      cliente: "",
      abogado: "Dra. Gómez",
      tipoEvento: "",
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

  const [abogados, setAbogados] = useState([]);
  useEffect(() => {
    const usuariosGuardados = localStorage.getItem("usuarios");
    if (usuariosGuardados) {
      const usuariosTotales = JSON.parse(usuariosGuardados);
      const abogadosTotales = usuariosTotales.filter(
        (usuarios) => usuarios.role === "abog"
      );
      setAbogados(abogadosTotales);
    }
  }, []);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Form.Group controlId="hora">
            <Form.Label>Hora</Form.Label>
            <Form.Select
              {...register("hora", {
                required: "La hora es obligatoria",
              })}
            >
              <option value="">Seleccioná una hora</option>
              <option value="08:00">08:00</option>
              <option value="08:00">08:30</option>
              <option value="09:00">09:00</option>
              <option value="08:00">09:30</option>
              <option value="10:00">10:00</option>
              <option value="08:00">10:30</option>
              <option value="11:00">11:00</option>
              <option value="08:00">11:30</option>
              <option value="12:00">12:00</option>
              <option value="08:00">12:30</option>
              <option value="13:00">13:00</option>
              <option value="08:00">13:30</option>
              <option value="14:00">14:00</option>
              <option value="08:00">14:30</option>
              <option value="15:00">15:00</option>
              <option value="08:00">15:30</option>
              <option value="16:00">16:00</option>
              <option value="08:00">16:30</option>
              <option value="17:00">17:00</option>
              <option value="08:00">17:30</option>
              <option value="18:00">18:00</option>
            </Form.Select>
            {errors.hora && (
              <small className="text-danger">{errors.hora.message}</small>
            )}
          </Form.Group>
          <Form.Group controlId="cliente" className="mt-3">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              type="text"
              {...register("cliente", {
                required: "El nombre del cliente es obligatorio",
                minLength: {
                  value: 10,
                  message:
                    "El nombre del cliente debe tener como mínimo 10 caracteres",
                },
                maxLength: {
                  value: 30,
                  message:
                    "El nombre del cliente debe tener como máximo 30 caracteres",
                },
              })}
            />
            {errors.cliente && (
              <small className="text-danger">{errors.cliente.message}</small>
            )}
          </Form.Group>
          <Form.Group controlId="abogado" className="mt-3">
            <Form.Label>Abogado asignado</Form.Label>
            <Form.Select
              {...register("abogado", {
                required: "El abogado es obligatorio",
              })}
            >
              {abogados.map((abogado) => (
                <option key={abogado.id} value={`Dr. ${abogado.apellido}`}>
                  {`Dr. ${abogado.apellido}`}
                </option>
              ))}
            </Form.Select>
            {errors.abogado && (
              <small className="text-danger">{errors.abogado.message}</small>
            )}
          </Form.Group>

          <Form.Group controlId="tipoEvento" className="mt-3">
            <Form.Label>Tipo de evento</Form.Label>
            <Form.Select
              {...register("tipoEvento", {
                required: "El tipo de evento es obligatorio",
              })}
            >
               <option value="">Seleccionar tipo de evento</option>
              <option value="Audiencia">Audiencia</option>
              <option value="Consulta">Consulta</option>
              <option value="Reunión">Reunión</option>
            </Form.Select>
            {errors.tipoEvento && (
              <small className="text-danger">{errors.tipoEvento.message}</small>
            )}
          </Form.Group>

          <Form.Group controlId="notas" className="mt-3">
            <Form.Label>Notas</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("notas", {
                required: "Las notas son obligatorias",
                minLength: {
                  value: 10,
                  message: "Las notas deben tener al menos 10 caracteres",
                },
                maxLength: {
                  value: 300,
                  message: "Las notas no pueden superar los 300 caracteres",
                },
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
  );
};
export default FormAgregarCita;
