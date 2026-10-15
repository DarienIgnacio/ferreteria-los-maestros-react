import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { validarNombre, validarCorreo } from "../utils/validaciones";

const datosIniciales = {
  nombre: "",
  correo: "",
  asunto: "",
  mensaje: ""
};

function Contacto() {
  const [datos, setDatos] = useState(datosIniciales);
  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState("");

  const cambiar = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const ejecutarValidacion = () => {
    const nuevosErrores = {};
    const errNombre = validarNombre(datos.nombre);
    const errCorreo = validarCorreo(datos.correo);

    if (errNombre) nuevosErrores.nombre = errNombre;
    if (errCorreo) nuevosErrores.correo = errCorreo;

    if (!datos.asunto.trim()) {
      nuevosErrores.asunto = "El asunto es obligatorio";
    }

    if (!datos.mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje no puede estar vacío";
    } else if (datos.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = "El mensaje debe contener al menos 10 caracteres";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const enviar = (e) => {
    e.preventDefault();
    if (!ejecutarValidacion()) return;

    setMensajeExito("¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a la brevedad.");
    setDatos(datosIniciales);
    setErrores({});
  };

  return (
    <Container className="py-5">
      <div className="border-bottom pb-3 mb-4">
        <h1 className="h2 text-dark">Contáctanos</h1>
        <p className="text-muted mb-0">
          ¿Tienes dudas sobre un producto o cotización mayorista? Escríbenos.
        </p>
      </div>

      <Row className="g-4">
        {/* Información de Contacto Directa */}
        <Col xs={12} lg={4}>
          <Card className="shadow-sm border-0 h-100 bg-white">
            <Card.Body className="p-4">
              <h4 className="fw-bold text-dark mb-4">Información de Atención</h4>

              <div className="mb-3">
                <strong className="d-block text-warning mb-1">📍 Dirección:</strong>
                <span className="text-secondary small">Av. Francisco de Aguirre 450, La Serena</span>
              </div>

              <div className="mb-3">
                <strong className="d-block text-warning mb-1">📞 Teléfono:</strong>
                <span className="text-secondary small">+56 51 234 5678</span>
              </div>

              <div className="mb-3">
                <strong className="d-block text-warning mb-1">✉️ Correo Electrónico:</strong>
                <span className="text-secondary small">contacto@losmaestros.cl</span>
              </div>

              <div className="mb-0">
                <strong className="d-block text-warning mb-1">🕒 Horarios:</strong>
                <span className="text-secondary small d-block">Lunes a Viernes: 08:30 - 18:30 hrs</span>
                <span className="text-secondary small d-block">Sábados: 09:00 - 14:00 hrs</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Formulario de Contacto */}
        <Col xs={12} lg={8}>
          <Card className="shadow-sm border-0 bg-white">
            <Card.Body className="p-4">
              <h4 className="fw-bold text-dark mb-4">Envíanos un Mensaje</h4>

              {mensajeExito && <Alert variant="success">{mensajeExito}</Alert>}

              <Form onSubmit={enviar} noValidate>
                <Row className="g-3">
                  <Col xs={12} md={6}>
                    <Form.Group controlId="contactoNombre">
                      <Form.Label>Nombre Completo</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={datos.nombre}
                        onChange={cambiar}
                        isInvalid={Boolean(errores.nombre)}
                        placeholder="Ej: Pedro Porro"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores.nombre}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group controlId="contactoCorreo">
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
                  </Col>

                  <Col xs={12}>
                    <Form.Group controlId="contactoAsunto">
                      <Form.Label>Asunto</Form.Label>
                      <Form.Control
                        type="text"
                        name="asunto"
                        value={datos.asunto}
                        onChange={cambiar}
                        isInvalid={Boolean(errores.asunto)}
                        placeholder="Ej: Cotización de herramientas"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores.asunto}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Group controlId="contactoMensaje">
                      <Form.Label>Mensaje</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="mensaje"
                        value={datos.mensaje}
                        onChange={cambiar}
                        isInvalid={Boolean(errores.mensaje)}
                        placeholder="Escribe tu consulta detallada aquí..."
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores.mensaje}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Button type="submit" variant="primary" className="px-4">
                      Enviar Mensaje
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;