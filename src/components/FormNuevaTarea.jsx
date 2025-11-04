import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const FormNuevaTarea = ({ show, onHide, onGuardar, itemEditar = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      descripcion: "",
      abogado: "",
      prioridad: "alta",
      fecha: "",
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
    const tarea = {
      id: itemEditar ? itemEditar.id : uuidv4(),
      ...data,
    };

    Swal.fire({
      icon: "success",
      title: itemEditar ? "¡Tarea actualizada!" : "¡Tarea agregada!",
      text: itemEditar
        ? "La tarea fue actualizada exitosamente."
        : "La tarea fue agregada exitosamente.",
      timer: 2000,
      showConfirmButton: false,
    });

    reset();
    onHide();
    onGuardar(tarea);
  };

  const handleCancel = () => {
    reset();
    onHide();
  };
  const modalTitle = itemEditar ? "Editar tarea" : "Nueva tarea";
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

          <Form.Group className="mb-3" controlId="abogado">
            <Form.Label>Responsable</Form.Label>
            <Form.Group controlId="abogado" className="mt-3">
              <Form.Label>Abogado asignado</Form.Label>
              <Form.Select {...register("abogado")}>
                {abogados.map((abogado) => (
                  <option key={abogado.id} value={`Dr. ${abogado.apellido}`}>
                    {`Dr. ${abogado.apellido}`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form.Group>

          <Form.Group className="mb-3" controlId="prioridad">
            <Form.Label>Prioridad</Form.Label>
            <Form.Select {...register("prioridad")}>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
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
            <Button variant="secondary" onClick={handleCancel} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {submitButtonText}
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default FormNuevaTarea;
