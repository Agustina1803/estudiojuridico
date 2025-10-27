import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const FormAgregarDocumento = ({ show, onHide, onGuardar, itemEditar = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      cliente: "",
      tipo: "Demanda",
      fecha: "",
      archivo: "",
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
    if (!data.archivo && !itemEditar) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor selecciona un archivo antes de subir.",
      });
      return;
    }

    const documento = {
      id: itemEditar ? itemEditar.id : uuidv4(),
      ...data,
    };

    Swal.fire({
      icon: "success",
      title: itemEditar ? "¡Documento actualizado!" : "¡Documento agregado!",
      text: itemEditar
        ? "El documento fue actualizado exitosamente."
        : "El documento fue agregado exitosamente.",
      timer: 2000,
      showConfirmButton: false,
    });

    reset();
    onHide();
    onGuardar(documento);
  };

  const handleCancel = () => {
    reset();
    onHide();
  };

  const manejarArchivo = (e) => {
    const archivoSeleccionado = e.target.files[0];
    if (archivoSeleccionado) {
      setValue("archivo", archivoSeleccionado.name);
      if (!watch("nombre")) {
        setValue("nombre", archivoSeleccionado.name);
      }
    }
  };

  const modalTitle = itemEditar ? "Editar Documento" : "Subir Nuevo Documento";
  const submitButtonText = itemEditar ? "Actualizar" : "Subir documento";

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>📤 {modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del documento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Contrato_Laboral.pdf"
              {...register("nombre", {
                required: "El nombre del documento es obligatorio",
              })}
            />
            {errors.nombre && (
              <small className="text-danger">{errors.nombre.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del cliente"
              {...register("cliente", {
                required: "El nombre del cliente es obligatorio",
              })}
            />
            {errors.cliente && (
              <small className="text-danger">{errors.cliente.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de documento</Form.Label>
            <Form.Select {...register("tipo")}>
              <option value="Demanda">Demanda</option>
              <option value="Contrato">Contrato</option>
              <option value="Escrito">Escrito</option>
              <option value="Poder">Poder</option>
              <option value="Notificación">Notificación</option>
              <option value="Otro">Otro</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
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

          <Form.Group className="mb-3">
            <Form.Label>Seleccionar archivo</Form.Label>
            <Form.Control
              type="file"
              onChange={manejarArchivo}
              accept=".pdf,.doc,.docx,.txt,.jpg,.png"
            />
            {watch("archivo") && (
              <small className="text-muted d-block mt-1">
                Archivo seleccionado: {watch("archivo")}
              </small>
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

export default FormAgregarDocumento;