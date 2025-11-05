import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormNuevoCliente = ({ show, onHide, onGuardar, itemEditar = null }) => {
const [showPassword, setShowPassword] = useState(false);
const passwordVisibility = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      formBasicPassword: "",
      role: "",
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
    const usuario = {
      id: itemEditar ? itemEditar.id : uuidv4(),
      ...data,
      formBasicPassword:
        itemEditar && data.newPassword
          ? data.newPassword
          : data.formBasicPassword,
    };

    Swal.fire({
      icon: "success",
      title: itemEditar
        ? `¡Usuario ${usuario.nombre} fue actualizado!`
        : "¡Usuario agregado!",
      text: itemEditar
        ? `El Usuario  fue actualizado  exitosamente.`
        : "El Usuario fue agregado exitosamente.",
      timer: 2000,
      showConfirmButton: false,
    });

    reset();
    onHide();
    onGuardar(usuario);
  };

  const handleCancel = () => {
    reset();
    onHide();
  };
  const modalTitle = itemEditar ? "Editar usuario" : "Nuevo usuario";
  const submitButtonText = itemEditar ? "Actualizar" : "Guardar";

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Juan"
              {...register("nombre", {
                required: "El nombre del usuario es obligatorio",
                minLength: {
                  value: 4,
                  message:
                    "El nombre del usuario debe tener como mínimo 10 caracteres",
                },
                maxLength: {
                  value: 30,
                  message:
                    "El nombre del usuario debe tener como máximo 50 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.nombre?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="apellido">
            <Form.Label>Apellido: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej:Perez"
              {...register("apellido", {
                required: "El apellido del usuario es obligatorio",
                minLength: {
                  value: 4,
                  message:
                    "El apellido del usuario debe tener como mínimo 10 caracteres",
                },
                maxLength: {
                  value: 30,
                  message:
                    "El apellido del usuario debe tener como máximo 50 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.apellido?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ej: juanperez@gmail.com"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value:
                    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                  message: "El formato del email es incorrecto",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="telefono">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              type="telefono"
              placeholder="3813005896"
              {...register("telefono", {
                required: "El teléfono es obligatorio",
              })}
            />
            <Form.Text className="text-danger">
              {errors.telefono?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <div className="input-group">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                {...register("formBasicPassword", {
                  required: "La contraseña es obligatoria",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                    message:
                      "Debe tener entre 8 y 16 caracteres, al menos un dígito, una minúscula, una mayúscula y un caracter especial.",
                  },
                })}
              />
              <Button
                variant="outline-secondary"
                type="button"
                onClick={passwordVisibility}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
            <Form.Text className="text-danger">
              {errors.formBasicPassword?.message}
            </Form.Text>
            
          </Form.Group>

          {itemEditar && (
  <Form.Group className="mb-3" controlId="newPassword">
    <Form.Label>Nueva contraseña</Form.Label>
    <div className="input-group">
      <Form.Control
        type={setShowPassword ? "text" : "password"}
        placeholder="Nueva contraseña"
        {...register("newPassword", {
          pattern: {
            value:
              /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
            message:
              "Debe tener entre 8 y 16 caracteres, al menos un dígito, una minúscula, una mayúscula y un caracter especial.",
          },
        })}
      />
      <Button
        variant="outline-secondary"
        type="button"
        onClick={passwordVisibility}
        aria-label={
          setShowPassword ? "Ocultar nueva contraseña" : "Mostrar nueva contraseña"
        }
      >
        {setShowPassword ? <FaEyeSlash /> : <FaEye />}
      </Button>
    </div>
    <Form.Text className="text-danger">
      {errors.newPassword?.message}
    </Form.Text>
  </Form.Group>
)}
          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Rol:</Form.Label>
            <Form.Select {...register("role")}>
              <option value="admin"> Administrador</option>
              <option value="secre"> Secretario/a</option>
              <option value="abog"> Abogado</option>
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

export default FormNuevoCliente;
