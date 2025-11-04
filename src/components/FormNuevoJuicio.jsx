import { useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const FormNuevoJuicio = ({ show, onHide, onGuardar, itemEditar = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombreDeJuicio: "",
      numeroExpediente: "",
      nombreCliente: "",
      juzgado: "",
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
    const juicio = {
      id: itemEditar ? itemEditar.id : uuidv4(),
      numeroExpediente: data.numeroExpediente,
      nombreDeJuicio: data.nombreDeJuicio,
      nombreCliente: data.nombreCliente,
      juzgado: data.juzgado,
      fecha: data.fecha,
      seleccionarArchivo: "ArchivoJuicio.pdf",
    };

    Swal.fire({
      icon: "success",
      title: itemEditar
        ? `¡juicio ${juicio.nombreDeJuicio} fue actualizado!`
        : "¡juicio agregado!",
      text: itemEditar
        ? `El juicio  fue actualizado  exitosamente.`
        : "El juicio fue agregado exitosamente.",
      timer: 2000,
      showConfirmButton: false,
    });

    reset();
    onHide();
    onGuardar(juicio);
  };

  const handleCancel = () => {
    reset();
    onHide();
  };
  const modalTitle = itemEditar ? "Editar juicio" : "Nuevo juicio";
  const submitButtonText = itemEditar ? "Actualizar" : "Guardar";

  const juzgadosTucuman = [
    "Juzgado en lo Civil y Comercial Común I",
    "Juzgado en lo Civil y Comercial Común II",
    "Juzgado en lo Civil y Comercial Común III",
    "Juzgado en lo Civil y Comercial Común IV",
    "Juzgado en lo Civil y Comercial Común V",
    "Juzgado en lo Civil y Comercial Común VI",
    "Juzgado en lo Civil y Comercial Común VII",
    "Juzgado en lo Civil y Comercial Común VIII",
    "Juzgado en lo Civil y Comercial Común IX",
    "Juzgado en lo Civil y Comercial Común X",
    "Juzgado de Familia y Sucesiones I",
    "Juzgado de Familia y Sucesiones II",
    "Juzgado de Familia y Sucesiones III",
    "Juzgado de Familia y Sucesiones IV",
    "Juzgado de Familia y Sucesiones V",
    "Juzgado de Familia y Sucesiones VI",
    "Juzgado de Familia y Sucesiones VII",
    "Juzgado de Familia y Sucesiones VIII",
    "Juzgado de Familia y Sucesiones IX",
    "Juzgado de Familia y Sucesiones X",
    "Juzgado en lo Penal de Instrucción I",
    "Juzgado en lo Penal de Instrucción II",
    "Juzgado en lo Penal de Instrucción III",
    "Juzgado en lo Penal de Instrucción IV",
    "Juzgado en lo Penal de Instrucción V",
  ];
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="nombreDeJuicio">
            <Form.Label>Nombre de Juicio: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Demanda por accidente de tráfico"
              {...register("nombreDeJuicio", {
                required: "El nombre del juicio es obligatorio",
                minLength: {
                  value: 10,
                  message:
                    "El nombre del juicio debe tener como mínimo 10 caracteres",
                },
                maxLength: {
                  value: 100,
                  message:
                    "El nombre del juicio debe tener como máximo 50 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.nombre?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="numeroExpediente">
            <Form.Label>Numero de expediente :</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 2030/234567"
              {...register("numeroExpediente", {
                required: "Este campo es obligatorio",
                validate: (value) => {
                  const limpio = value.replace(/-/g, "");
                  const soloNumeros = /^\d{7,11}$/.test(limpio);
                  if (!soloNumeros)
                    return "Debe contener solo números (5 a 11 dígitos)";
                  if (limpio.length === 11 && !validarCuit(limpio)) {
                    return "numero de expediente inválido";
                  }
                  return true;
                },
              })}
              isInvalid={!!errors.numeroExpediente}
            />
            <Form.Text className="text-danger">
              {errors.numeroExpediente?.message}
            </Form.Text>
          </Form.Group>
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

          <Form.Group controlId="juzgado" className="mt-3">
            <Form.Label>Juzgado</Form.Label>
            <Form.Select {...register("juzgado")}>
              {juzgadosTucuman.map((juzgado, index) => (
                <option key={index} value={juzgado}>
                  {juzgado}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="fecha">
            <Form.Label>Fecha:</Form.Label>
            <Form.Control
              type="date"
              {...register("fecha", {
                required: "La fecha es obligatorio",
              })}
            ></Form.Control>
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

          <div className="justify-content-end d-flex">
            <Button variant="success" type="submit" className="me-2">
              {submitButtonText}
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormNuevoJuicio;
