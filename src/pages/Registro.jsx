import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { registrarClienteApi } from "../services/authService";

export default function Registro({ onLoginExitoso }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);
    try {
      const sesion = await registrarClienteApi({ nombre, correo, password });

      const datosUsuario = {
        nombre: sesion.nombre,
        correo: sesion.correo,
        rol: sesion.rol, // El backend asigna "CLIENTE" automáticamente
      };

      sessionStorage.setItem("token", sesion.token);
      sessionStorage.setItem("usuario", JSON.stringify(datosUsuario));

      if (onLoginExitoso) {
        onLoginExitoso(datosUsuario);
      }

      alert(`¡Bienvenido a Ferretería Los Maestros, ${sesion.nombre}!`);
      navigate("/productos");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: "480px" }}>
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <h3 className="text-center mb-2">Crear Cuenta</h3>
          <p className="text-center text-muted mb-4">
            Regístrate como cliente para realizar tus compras
          </p>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="regNombre">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Carlos Soto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="regCorreo">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="carlos@ejemplo.cl"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="regPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="regConfirmar">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              className="w-100"
              disabled={cargando}
            >
              {cargando ? "Registrando..." : "Registrarse"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <small>
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}