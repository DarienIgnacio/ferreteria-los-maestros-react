import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCarrito from "../components/ItemCarrito";
import ResumenCompra from "../components/ResumenCompra";

export default function Carrito({
  carrito,
  onModificarCantidad,
  onEliminarItem,
  onVaciarCarrito,
}) {
  const totalPagar = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const handleFinalizarCompra = () => {
    alert("¡Gracias por tu compra en Ferretería Los Maestros! Tu pedido ha sido procesado.");
    onVaciarCarrito();
  };

  if (carrito.length === 0) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="info" className="py-4">
          <h4>Tu carrito está vacío</h4>
          <p>Explora nuestro catálogo y agrega las herramientas que necesites.</p>
          <Button as={Link} to="/productos" variant="primary">
            Ir al Catálogo
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">Carrito de Compras</h2>
      <Row className="g-4">
        <Col lg={8}>
          {carrito.map((item) => (
            <ItemCarrito
              key={item.codigo}
              item={item}
              onIncrementar={(codigo) => onModificarCantidad(codigo, 1)}
              onDecrementar={(codigo) => onModificarCantidad(codigo, -1)}
              onEliminar={onEliminarItem}
            />
          ))}
        </Col>

        <Col lg={4}>
          <ResumenCompra
            totalPagar={totalPagar}
            cantidadTotal={cantidadTotal}
            onVaciarCarrito={onVaciarCarrito}
            onFinalizarCompra={handleFinalizarCompra}
          />
        </Col>
      </Row>
    </Container>
  );
}