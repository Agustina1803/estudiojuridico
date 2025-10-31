import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { useEffect } from "react";


const FormNuevaFactura = ({ show, onHide, onGuardar, itemEditar = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fecha: "",
      nombreCliente: "",
      concepto: "",
      monto: "",
      seleccionarArchivo: "",
      estado: "",
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
    const factura = {
       id: itemEditar ? itemEditar.id : uuidv4(),
      fecha: data.fecha,
      nombreCliente: data.nombreCliente,
      concepto: data.concepto,
      monto: data.monto,
      seleccionarArchivo: "Factura.pdf",
      estado: data.estado,
    };
    Swal.fire({
      icon: "success",
      title: `¡${factura.seleccionarArchivo} agregada!`,
      text: "La factura fue agregada exitosamente.",
      timer: 2000,
      showConfirmButton: false,
    });

    reset();
    onHide();
    onGuardar(factura);
  };

  const handleCancel = () => {
    reset();
    onHide();
  };

  const modalTitle = itemEditar ? "Editar factura" : "Nueva factura";
  const submitButtonText = itemEditar ? "Actualizar" : "Guardar";

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
          <Form.Group className="mb-3" controlId="nombreCliente">
            <Form.Label>Nombre del cliente</Form.Label>
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
          <Form.Group className="mb-3" controlId="concepto">
            <Form.Label>Concepto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Concepto de la factura..."
              {...register("concepto", {
                required: "El concepto de la factura es obligatorio",
                minLength: {
                  value: 15,
                  message:
                    "El concepto de la factura debe tener como mínimo 10 caracteres",
                },
                maxLength: {
                  value: 50,
                  message:
                    "El concepto de la factura debe tener como máximo 50 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.concepto?.message}
            </Form.Text>
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

          <Form.Group className="mb-3" controlId="monto">
            <Form.Label>Monto</Form.Label>
            <Form.Control
              type="number"
              {...register("monto", {
                required: "El monto es obligatorio",
                min: {
                  value: 1,
                  message: "El monto debe ser mayor a 0",
                },
              })}
            />
            {errors.monto && (
              <small className="text-danger">{errors.monto.message}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="estado">
            <Form.Label>Estado</Form.Label>
            <Form.Select {...register("estado")}>
              <option value="Pagada">
                Pagada
              </option>
              <option value="Pendiente">Pendiente</option>
              <option value="Anulada">Anulada</option>
            </Form.Select>
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

export default FormNuevaFactura;
