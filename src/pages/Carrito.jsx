import { Container, Row, Col, Card, Table, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Carrito({ carrito, onModificarCantidad, onEliminarItem, onVaciarCarrito }) {
  const navigate = useNavigate();

  // Calcular el total bruto sumando (precio * cantidad) de cada ítem
  const total = carrito.reduce((acum, item) => acum + item.precio * item.cantidad, 0);
  
  // Desglose Neto e IVA (19% en Chile)
  const neto = Math.round(total / 1.19);
  const iva = total - neto;

  const formatearMoneda = (valor) => `$${valor.toLocaleString("es-CL")}`;

  const procesarCompra = () => {
    alert("¡Muchas gracias por su compra! Su pedido ha sido procesado con éxito.");
    onVaciarCarrito();
    navigate("/");
  };

  return (
    <Container className="py-4">
      <div className="border-bottom pb-3 mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h1 className="h2 text-dark mb-1">Carrito de Compras</h1>
          <p className="text-muted mb-0">Revisa tus productos seleccionados antes de finalizar.</p>
        </div>
        {carrito.length > 0 && (
          <Button variant="outline-danger" size="sm" onClick={onVaciarCarrito}>
            🗑️ Vaciar Carrito
          </Button>
        )}
      </div>

      {carrito.length === 0 ? (
        <Card className="text-center py-5 shadow-sm border-0">
          <Card.Body>
            <div className="fs-1 mb-3">🛒</div>
            <h3>Tu carrito está vacío</h3>
            <p className="text-muted mb-4">
              Aún no has agregado ninguna herramienta o material de construcción.
            </p>
            <Button as={Link} to="/productos" variant="warning" className="fw-bold px-4">
              Explorar Productos
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-4">
          {/* Tabla de Productos Seleccionados */}
          <Col xs={12} lg={8}>
            <Card className="shadow-sm border-0 mb-3">
              <Card.Body className="p-0">
                <Table responsive hover className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ minWidth: "220px" }}>Producto</th>
                      <th className="text-center">Precio</th>
                      <th className="text-center" style={{ minWidth: "120px" }}>Cantidad</th>
                      <th className="text-end">Subtotal</th>
                      <th className="text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((item) => (
                      <tr key={item.codigo}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={item.imagen || "https://placehold.co/100x100?text=Sin+Imagen"}
                              alt={item.nombre}
                              style={{ width: "50px", height: "50px", objectFit: "contain" }}
                              className="rounded border bg-white p-1"
                            />
                            <div>
                              <div className="fw-bold text-dark small">{item.nombre}</div>
                              <span className="text-muted extra-small">SKU: {item.codigo}</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-center small">{formatearMoneda(item.precio)}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center align-items-center gap-1">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className="px-2 py-0"
                              onClick={() => onModificarCantidad(item.codigo, -1)}
                            >
                              -
                            </Button>
                            <span className="fw-bold px-2">{item.cantidad}</span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className="px-2 py-0"
                              onClick={() => onModificarCantidad(item.codigo, 1)}
                              disabled={item.cantidad >= item.stock}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="text-end fw-bold text-dark small">
                          {formatearMoneda(item.precio * item.cantidad)}
                        </td>
                        <td className="text-center">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="border-0"
                            title="Eliminar producto"
                            onClick={() => onEliminarItem(item.codigo)}
                          >
                            ❌
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Button as={Link} to="/productos" variant="outline-dark" size="sm">
              ← Seguir Comprando
            </Button>
          </Col>

          {/* Tarjeta con el Resumen Financiero */}
          <Col xs={12} lg={4}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3 text-dark">Resumen de Compra</h5>
                
                <div className="d-flex justify-content-between mb-2 text-secondary">
                  <span>Neto:</span>
                  <span>{formatearMoneda(neto)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2 text-secondary">
                  <span>IVA (19%):</span>
                  <span>{formatearMoneda(iva)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4 fs-5 fw-bold text-dark">
                  <span>Total Final:</span>
                  <span className="text-primary">{formatearMoneda(total)}</span>
                </div>

                <Button
                  variant="success"
                  size="lg"
                  className="w-100 fw-bold shadow-sm"
                  onClick={procesarCompra}
                >
                  Finalizar Compra
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Carrito;