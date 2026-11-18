import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from "react-bootstrap";
import { buscarProducto } from "../services/tiendaService";

export default function DetalleProducto({ onAgregarCarrito, usuario }) {
  const { codigo } = useParams(); // Recibe el ID numérico desde /productos/:codigo
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarDetalle() {
      try {
        setError("");
        const data = await buscarProducto(codigo);
        setProducto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    cargarDetalle();
  }, [codigo]);

  if (cargando) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Cargando detalle del producto...</p>
      </Container>
    );
  }

  if (error || !producto) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          {error || "No se encontró el producto solicitado."}
        </Alert>
        <Button as={Link} to="/productos" variant="secondary">
          ← Volver al Catálogo
        </Button>
      </Container>
    );
  }

  const sinStock = producto.stock <= 0;
  const esVendedor = usuario?.rol === "VENDEDOR";

  return (
    <Container className="py-4">
      <Button as={Link} to="/productos" variant="outline-secondary" size="sm" className="mb-4">
        ← Volver al Catálogo
      </Button>

      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <Row className="g-4 align-items-center">
            <Col md={5}>
              <img
                src={producto.imagen || "https://via.placeholder.com/500x400?text=Sin+Imagen"}
                alt={producto.nombre}
                className="img-fluid rounded border w-100"
                style={{ maxHeight: "380px", objectFit: "cover" }}
              />
            </Col>

            <Col md={7}>
              <div className="d-flex gap-2 align-items-center mb-2">
                <Badge bg="secondary">{producto.categoria?.nombre || "General"}</Badge>
                <span className="text-muted small">Código: {producto.codigo}</span>
              </div>

              <h1 className="h2 fw-bold text-dark mb-3">{producto.nombre}</h1>

              <h2 className="h3 text-primary fw-bold mb-3">
                ${producto.precio?.toLocaleString("es-CL")}
              </h2>

              <p className="text-muted mb-4">
                {producto.descripcion || "Sin descripción detallada disponible."}
              </p>

              <div className="mb-4">
                <strong>Disponibilidad: </strong>
                <Badge bg={sinStock ? "danger" : "success"} className="fs-6">
                  {sinStock ? "Agotado" : `${producto.stock} unidades en stock`}
                </Badge>
              </div>

              {!esVendedor && onAgregarCarrito && (
                <Button
                  variant="success"
                  size="lg"
                  disabled={sinStock}
                  onClick={() => onAgregarCarrito(producto)}
                >
                  {sinStock ? "Producto Agotado" : "🛒 Agregar al Carrito"}
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}