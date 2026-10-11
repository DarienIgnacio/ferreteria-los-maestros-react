// src/pages/DetalleProducto.jsx
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Badge, Button, Card } from "react-bootstrap";
import { obtenerProductos } from "../utils/persistenciaProductos";

function DetalleProducto({ onAgregarCarrito }) {
  const { codigo } = useParams();
  const productos = obtenerProductos();
  const producto = productos.find((p) => p.codigo === codigo);

  if (!producto) {
    return (
      <Container className="py-5 text-center">
        <h2>Producto no encontrado</h2>
        <p className="text-muted">El código indicado no existe en nuestro catálogo.</p>
        <Button as={Link} to="/productos" variant="warning">Volver al Catálogo</Button>
      </Container>
    );
  }

  const rutaImagen = producto.imagen
    ? producto.imagen.startsWith("/")
      ? producto.imagen
      : `/${producto.imagen}`
    : "https://via.placeholder.com/400x300?text=Ferreter%C3%ADa";

  return (
    <Container className="py-5">
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <Row className="g-4 align-items-center">

            <Col xs={12} md={6}>
              <img
                src={rutaImagen}
                alt={producto.nombre}
                className="img-fluid rounded shadow-sm w-100"
                style={{ maxHeight: "300px", width: "auto", objectFit: "contain" }}/>
            </Col>

            <Col xs={12} md={6}>
              <Badge bg="secondary" className="mb-2">{producto.categoria}</Badge>
              <h1 className="h2 fw-bold text-dark">{producto.nombre}</h1>
              <p className="text-muted small mb-3">Código SKU: {producto.codigo}</p>

              <p className="text-secondary">{producto.descripcion}</p>

              <div className="mb-3">
                <span className="h3 fw-bold text-primary">${producto.precio.toLocaleString("es-CL")}</span>
              </div>

              <div className="mb-4">
                <strong>Stock disponible:</strong>{" "}
                {producto.stock > 0 ? (
                  <span className="text-success fw-bold">{producto.stock} unidades</span>
                ) : (
                  <span className="text-danger fw-bold">Agotado</span>
                )}
              </div>

              <div className="d-flex gap-2">
                <Button variant="primary" size="lg" disabled={producto.stock === 0} onClick={() => onAgregarCarrito(producto)}>
                  Añadir al Carrito
                </Button>
                <Button as={Link} to="/productos" variant="outline-secondary" size="lg">Volver al Catálogo</Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DetalleProducto;