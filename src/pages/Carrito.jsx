import { useState } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ItemCarrito from "../components/ItemCarrito";
import ResumenCompra from "../components/ResumenCompra";
import { crearBoleta } from "../services/tiendaService";

export default function Carrito({
  carrito,
  usuario,
  onModificarCantidad,
  onEliminarItem,
  onVaciarCarrito,
}) {
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");
  const [boletaGenerada, setBoletaGenerada] = useState(null);
  const navigate = useNavigate();

  const totalPagar = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const handleFinalizarCompra = async () => {
    if (!usuario) {
      alert("Debes iniciar sesión para finalizar tu compra.");
      navigate("/login");
      return;
    }

    setError("");
    setProcesando(true);
    try {
      const items = carrito.map((item) => ({
        productoId: item.id,
        cantidad: item.cantidad,
      }));

      const boleta = await crearBoleta(items);
      setBoletaGenerada(boleta);
      onVaciarCarrito();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcesando(false);
    }
  };

  if (boletaGenerada) {
    return (
      <Container className="my-5 text-center" style={{ maxWidth: "600px" }}>
        <Alert variant="success" className="py-4 shadow-sm">
          <h4>¡Compra realizada con éxito!</h4>
          <p className="mb-1">
            <strong>Boleta N° #{boletaGenerada.id}</strong>
          </p>
          <p className="mb-3">
            Total pagado: <strong>${boletaGenerada.total.toLocaleString("es-CL")}</strong>
          </p>
          <Button as={Link} to="/productos" variant="primary">
            Seguir Comprando
          </Button>
        </Alert>
      </Container>
    );
  }

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
      {error && <Alert variant="danger">{error}</Alert>}
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
            disabled={procesando}
          />
        </Col>
      </Row>
    </Container>
  );
}