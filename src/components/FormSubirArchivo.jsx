import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";


const FormSubirArchivo = ({ show, onHide, onGuardar, itemEditar = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombreCliente: "",
      tipodearchivo: "",
      fecha: "",
      seleccionarArchivo: "",
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
    const documento = {
       id: itemEditar ? itemEditar.id : uuidv4(),
      seleccionarArchivo: "archivo_simulado.pdf",
      nombreCliente: data.nombreCliente,
      tipodearchivo: data.tipodearchivo,
      fecha: data.fecha,
    };
    Swal.fire({
      icon: "success",
      title: `¡Archivo ${documento.seleccionarArchivo} agregado!`,
      text: "El archivo fue agregado exitosamente.",
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

  const modalTitle = itemEditar ? "Editar documento" : "Nuevo documento";
  const submitButtonText = itemEditar ? "Actualizar" : "Guardar";

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="nombreCliente">
            <Form.Label>Cliente:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Juan Perez"
              {...register("nombreCliente", {
                required: "El nombre del cliente es obligatorio",
                minLength: {
                  value: 10,
                  message:
                    "El nombre del cliente debe tener como mínimo 10 caracteres",
                },
                maxLength: {
                  value: 50,
                  message:
                    "El nombre del cliente debe tener como máximo 50 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.nombreCliente?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="tipodearchivo">
            <Form.Label>Formato de archivo</Form.Label>
            <Form.Select {...register("tipodearchivo")}>
              <option value="demanda"> Demanda </option>
              <option value="contrato"> Contrato</option>
              <option value="escrito"> Escrito</option>
              <option value="poder"> Poder</option>
              <option value="notificacion"> Notificación</option>
            </Form.Select>
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="seleccionarArchivo">
            <Form.Label>Seleccionar archivo</Form.Label>
            <Form.Control
              type="file"
              {...register("seleccionarArchivo", {
                required: "El archivo es obligatorio",
              })}
            />
            {errors.seleccionarArchivo && (
              <small className="text-danger">
                {errors.seleccionarArchivo.message}
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

export default FormSubirArchivo;
