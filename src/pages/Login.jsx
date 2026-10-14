import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { validarCorreo, validarClave, DOMINIOS_PERMITIDOS } from "../utils/validaciones";
import { autenticarUsuario } from "../utils/persistenciaUsuarios";

const datosIniciales = { correo: "", clave: "" };

function Login() {
  const [datos, setDatos] = useState(datosIniciales);
  const [errores, setErrores] = useState({});
  const [errorLogin, setErrorLogin] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const navigate = useNavigate();

  const cambiar = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    setErrorLogin("");
  };

  const ejecutarValidacion = () => {
    const nuevosErrores = {};
    const errCorreo = validarCorreo(datos.correo);
    const errClave = validarClave(datos.clave);

    if (errCorreo) nuevosErrores.correo = errCorreo;
    if (errClave) nuevosErrores.clave = errClave;

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const enviar = (e) => {
    e.preventDefault();
    if (!ejecutarValidacion()) return;

    // Autenticar con datos en localStorage
    const resultado = autenticarUsuario(datos.correo, datos.clave);

    if (!resultado.exito) {
      setErrorLogin(resultado.mensaje);
      return;
    }

    setMensajeExito(`¡Bienvenido/a, ${resultado.usuario.nombre}! Redirigiendo...`);
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="shadow-sm border-0 p-3" style={{ maxWidth: "450px", width: "100%" }}>
        <Card.Body>
          <h2 className="text-center fw-bold text-dark mb-4">Iniciar Sesión</h2>

          {mensajeExito && <Alert variant="success">{mensajeExito}</Alert>}
          {errorLogin && <Alert variant="danger">{errorLogin}</Alert>}

          <Form onSubmit={enviar} noValidate>
            <Form.Group className="mb-3" controlId="loginCorreo">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={datos.correo}
                onChange={cambiar}
                isInvalid={Boolean(errores.correo)}
                placeholder="ejemplo@duoc.cl"
              />
              <Form.Control.Feedback type="invalid">
                {errores.correo}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginClave">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="clave"
                value={datos.clave}
                onChange={cambiar}
                isInvalid={Boolean(errores.clave)}
                placeholder="******"
              />
              <Form.Control.Feedback type="invalid">
                {errores.clave}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 mb-3">
              Ingresar
            </Button>

            <div className="text-center small">
              ¿No tienes una cuenta?{" "}
              <Link to="/registro" className="text-decoration-none fw-bold">
                Regístrate aquí
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;