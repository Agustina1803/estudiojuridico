import { Modal, Button, Form, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";


const FormSubirArchivo = ({ mostrar, cerrar }) => {
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

    const SubirArchivo = (data) => {
        data.id = uuidv4();
        console.log(data);
        reset();

    };

    return (

        <Modal show={mostrar} onHide={cerrar} >
            <Modal.Header closeButton>
                <Modal.Title>Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(SubirArchivo)}>
                    <Form.Group className="mb-3" controlId="nombre">
                        <Form.Label>Cliente:: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre del cliente"
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

                    <Form.Group className="mb-3" controlId="tipodearchivo">
                        <Form.Label>Formato de archivo</Form.Label>
                        <Form.Select {...register("tipodearchivo")}>
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

                </Form>

            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    )
};

export default FormSubirArchivo