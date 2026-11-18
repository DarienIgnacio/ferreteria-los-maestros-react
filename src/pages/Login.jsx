import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { loginApi } from "../services/authService";

export default function Login({ onLoginExitoso }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      const sesion = await loginApi({ correo, password });
      const datosUsuario = {
        nombre: sesion.nombre,
        correo: sesion.correo,
        rol: sesion.rol,
      };
      sessionStorage.setItem("token", sesion.token);
      sessionStorage.setItem("usuario", JSON.stringify(datosUsuario));
      onLoginExitoso(datosUsuario);

      if (sesion.rol === "ADMIN") navigate("/admin");
      else if (sesion.rol === "VENDEDOR") navigate("/vendedor/ordenes");
      else navigate("/productos");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: "450px" }}>
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <h3 className="text-center mb-4">Iniciar Sesión</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" disabled={cargando}>
              {cargando ? "Ingresando..." : "Ingresar"}
            </Button>
          </Form>
          <div className="text-center mt-3">
            <small>
              ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}