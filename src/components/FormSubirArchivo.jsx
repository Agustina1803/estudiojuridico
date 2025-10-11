import { Modal, Button, Form, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";


const FormSubirArchivo = ({ mostrar, cerrar, limpiar }) => {
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

    const validarDNI = (dni) => {
        if (cuit.length !== 8) return false;
        const mult = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
        const digitos = dni.split("").map(Number);
        const suma = mult.reduce((acc, val, i) => acc + val * digitos[i], 0);
        const resto = suma % 8;
        const verificador = resto === 0 ? 0 : resto === 1 ? 9 : 8 - resto;
        return verificador === digitos[8];
    };

    return (

        <Modal show={mostrar} onHide={cerrar} reset={limpiar}>
            <Modal.Header closeButton>
                <Modal.Title>Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(crearCliente)}>
                    <Form.Group className="mb-3" controlId="nombre">
                        <Form.Label>Nombre Completo del Cliente: </Form.Label>
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
                        <Form.Label>Número de DNI :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ej: 30123456"
                            {...register("identificador", {
                                required: "Este campo es obligatorio",
                                validate: (value) => {
                                    const limpio = value.replace(/-/g, "");
                                    const soloNumeros = /^\d{7,8}$/.test(limpio);
                                    if (!soloNumeros)
                                        return "Debe contener solo números (7 a 8 dígitos)";
                                    if (limpio.length === 8 && !validarDNI(limpio)) {
                                        return "El DNI es inválido";
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

                    <Form.Group className="mb-3" controlId="prioridad">
                        <Form.Label>Formato de archivo</Form.Label>
                        <Form.Select {...register("prioridad")}>
                            <option value="alta"> .JPG</option>
                            <option value="alta"> .PNG</option>
                            <option value="alta"> .PDF</option>
                        </Form.Select>
                    </Form.Group>

                    <Stack direction="horizontal" gap={3}>
                        <Form.Control className="me-auto" placeholder="Añade aquí tu archivo" />
                        <Button variant="success" type="submit" className="me-2">Subir</Button>
                        <div className="vr" />
                        <Button variant="danger" onClick={cerrar}>Cancelar</Button>
                    </Stack>

                    {/*  <Form.Group className="mb-3" controlId="prioridad">
                        <Form.Label>Seleccionar archivo a subir</Form.Label>
                        <Form.Select {...register("prioridad")}>
                            <option value="alta"> .jpg</option>
                            <option value="alta"> .pdf</option>
                        </Form.Select>
                        
                    </Form.Group> */}
                    <br />
                    {/* <div className="justify-content-end d-flex">
                        <Button variant="success" type="submit" className="me-2">
                            Subir
                        </Button>
                        <Button variant="secondary" onClick={cerrar}>
                            Cancelar
                        </Button>
                    </div> */}
                </Form>

            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    )
};

export default FormSubirArchivo
