import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TarjetaProducto({ producto, onAgregarCarrito }) {
  const sinStock = producto.stock <= 0;

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={producto.imagen || "https://via.placeholder.com/300x200?text=Sin+Imagen"}
        alt={producto.nombre}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Badge bg="secondary">{producto.categoria}</Badge>
          <small className="text-muted">Cód: {producto.codigo}</small>
        </div>

        <Card.Title className="h6 fw-bold">{producto.nombre}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {producto.descripcion}
        </Card.Text>

        <div className="mt-2">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="h5 mb-0 text-primary fw-bold">
              ${producto.precio?.toLocaleString("es-CL")}
            </span>
            <Badge bg={sinStock ? "danger" : "success"}>
              {sinStock ? "Agotado" : `Stock: ${producto.stock}`}
            </Badge>
          </div>

          <div className="d-grid gap-2">
            <Button
              as={Link}
              to={`/productos/${producto.id}`}
              variant="outline-dark"
              size="sm"
            >
              Ver Detalle
            </Button>

            {onAgregarCarrito && (
              <Button
                variant="success"
                size="sm"
                disabled={sinStock}
                onClick={() => onAgregarCarrito(producto)}
              >
                {sinStock ? "Sin Stock" : "🛒 Agregar al Carrito"}
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}