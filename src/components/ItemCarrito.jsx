import { Card, Row, Col, Button, Badge } from "react-bootstrap";

export default function ItemCarrito({
  item,
  onIncrementar,
  onDecrementar,
  onEliminar,
}) {
  const subtotal = item.precio * item.cantidad;

  return (
    <Card className="mb-3 shadow-sm border-0">
      <Card.Body>
        <Row className="align-items-center g-3">
          {/* Imagen en miniatura */}
          <Col xs={3} md={2}>
            <img
              src={item.imagen}
              alt={item.nombre}
              className="img-fluid rounded"
              style={{ maxHeight: "80px", objectFit: "cover" }}
            />
          </Col>

          {/* Nombre, código y precio unitario */}
          <Col xs={9} md={4}>
            <h6 className="mb-1 fw-bold">{item.nombre}</h6>
            <small className="text-muted d-block">Código: {item.codigo}</small>
            <span className="text-secondary small">
              Unitario: ${item.precio.toLocaleString("es-CL")}
            </span>
          </Col>

          {/* Controles de Cantidad (+ / -) */}
          <Col xs={6} md={3} className="d-flex align-items-center gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => onDecrementar(item.codigo)}
              disabled={item.cantidad <= 1}
            >
              -
            </Button>
            <Badge bg="light" text="dark" className="border px-3 py-2 fs-6">
              {item.cantidad}
            </Badge>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => onIncrementar(item.codigo)}
              disabled={item.cantidad >= item.stock}
            >
              +
            </Button>
          </Col>

          {/* Subtotal por producto y botón eliminar */}
          <Col xs={6} md={3} className="text-end">
            <div className="fw-bold text-primary mb-1">
              ${subtotal.toLocaleString("es-CL")}
            </div>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onEliminar(item.codigo)}
            >
              Eliminar
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}