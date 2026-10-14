import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  validarNombre,
  validarRun,
  validarCorreo,
  validarClave,
  validarConfirmacionClave
} from "../utils/validaciones";
import { registrarUsuario } from "../utils/persistenciaUsuarios";

const datosIniciales = {
  nombre: "",
  run: "",
  correo: "",
  clave: "",
  confirmarClave: ""
};

function Registro() {
  const [datos, setDatos] = useState(datosIniciales);
  const [errores, setErrores] = useState({});
  const [errorServer, setErrorServer] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const navigate = useNavigate();

  const cambiar = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    setErrorServer("");
  };

  const ejecutarValidacion = () => {
    const nuevosErrores = {};
    const errNombre = validarNombre(datos.nombre);
    const errRun = validarRun(datos.run);
    const errCorreo = validarCorreo(datos.correo);
    const errClave = validarClave(datos.clave);
    const errConfirmar = validarConfirmacionClave(datos.clave, datos.confirmarClave);

    if (errNombre) nuevosErrores.nombre = errNombre;
    if (errRun) nuevosErrores.run = errRun;
    if (errCorreo) nuevosErrores.correo = errCorreo;
    if (errClave) nuevosErrores.clave = errClave;
    if (errConfirmar) nuevosErrores.confirmarClave = errConfirmar;

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const enviar = (e) => {
    e.preventDefault();
    if (!ejecutarValidacion()) return;

    // Registrar en localStorage
    const resultado = registrarUsuario({
      nombre: datos.nombre.trim(),
      run: datos.run.trim(),
      correo: datos.correo.trim(),
      clave: datos.clave
    });

    if (!resultado.exito) {
      setErrorServer(resultado.mensaje);
      return;
    }

    setMensajeExito("¡Cuenta creada exitosamente! Redirigiendo al inicio de sesión...");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="shadow-sm border-0 p-3" style={{ maxWidth: "500px", width: "100%" }}>
        <Card.Body>
          <h2 className="text-center fw-bold text-dark mb-4">Crear Cuenta</h2>

          {mensajeExito && <Alert variant="success">{mensajeExito}</Alert>}
          {errorServer && <Alert variant="danger">{errorServer}</Alert>}

          <Form onSubmit={enviar} noValidate>
            <Form.Group className="mb-3" controlId="regNombre">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={datos.nombre}
                onChange={cambiar}
                isInvalid={Boolean(errores.nombre)}
                placeholder="Juan Pérez"
              />
              <Form.Control.Feedback type="invalid">
                {errores.nombre}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="regRun">
              <Form.Label>RUN / RUT</Form.Label>
              <Form.Control
                type="text"
                name="run"
                value={datos.run}
                onChange={cambiar}
                isInvalid={Boolean(errores.run)}
                placeholder="12345678-K"
              />
              <Form.Control.Feedback type="invalid">
                {errores.run}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="regCorreo">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={datos.correo}
                onChange={cambiar}
                isInvalid={Boolean(errores.correo)}
                placeholder="correo@duoc.cl"
              />
              <Form.Control.Feedback type="invalid">
                {errores.correo}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="regClave">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="clave"
                value={datos.clave}
                onChange={cambiar}
                isInvalid={Boolean(errores.clave)}
                placeholder="Mínimo 6 caracteres"
              />
              <Form.Control.Feedback type="invalid">
                {errores.clave}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="regConfirmarClave">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="confirmarClave"
                value={datos.confirmarClave}
                onChange={cambiar}
                isInvalid={Boolean(errores.confirmarClave)}
                placeholder="Repita su contraseña"
              />
              <Form.Control.Feedback type="invalid">
                {errores.confirmarClave}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="success" className="w-100 mb-3">
              Registrar Cuenta
            </Button>

            <div className="text-center small">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-decoration-none fw-bold">
                Inicia sesión aquí
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Registro;