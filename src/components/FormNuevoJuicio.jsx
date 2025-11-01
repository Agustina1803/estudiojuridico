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
            nombre: "",
            identificador: "",
            email: "",
            telefono: "",
            estado: "inactivo",
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
            ...data,
        };

        Swal.fire({
            icon: "success",
            title: itemEditar ? `¡juicio ${juicio.nombre} fue actualizado!` : "¡juicio agregado!",
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


    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="nombre">
                        <Form.Label>Nombre de Juicio: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ej: Juan Perez"
                            {...register("nombre", {
                                required: "El nombre del juicio es obligatorio",
                                minLength: {
                                    value: 10,
                                    message:
                                        "El nombre del juicio debe tener como mínimo 10 caracteres",
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                        "El nombre del juicio debe tener como máximo 50 caracteres",
                                },
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors.nombre?.message}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="identificador">
                        <Form.Label>Numero de expediente :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ej: 2030/234567"
                            {...register("identificador", {
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
                            isInvalid={!!errors.identificador}
                        />
                        <Form.Text className="text-danger">
                            {errors.identificador?.message}
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

                    <Form.Group className="mb-3" controlId="fecha">
                        <Form.Label>Fecha:</Form.Label>
                        <Form.Control
                            type="date"
                            {...register("fecha", {
                                required: "La fecha es obligatorio",
                            })}
                        ></Form.Control>
                    </Form.Group>

                  
                   
                    <Form.Group className="mb-3" controlId="prioridad">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select {...register("prioridad")}>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </Form.Select>
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
