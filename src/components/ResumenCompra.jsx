import { Card, Button, ListGroup } from "react-bootstrap";

export default function ResumenCompra({
  totalPagar,
  cantidadTotal,
  onVaciarCarrito,
  onFinalizarCompra,
}) {
  // Cálculo desglosado asumiendo que los precios de la tienda incluyen IVA (19%)
  const neto = Math.round(totalPagar / 1.19);
  const iva = totalPagar - neto;

  return (
    <Card className="shadow-sm border-0 bg-light">
      <Card.Body>
        <Card.Title className="border-bottom pb-2 mb-3 fw-bold">
          Resumen del Pedido
        </Card.Title>

        <ListGroup variant="flush" className="mb-3 bg-transparent">
          <ListGroup.Item className="d-flex justify-content-between bg-transparent px-0">
            <span className="text-muted">Productos ({cantidadTotal}):</span>
            <span>${neto.toLocaleString("es-CL")}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between bg-transparent px-0">
            <span className="text-muted">IVA (19%):</span>
            <span>${iva.toLocaleString("es-CL")}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between bg-transparent px-0 fw-bold fs-5 text-dark border-top pt-2">
            <span>Total a Pagar:</span>
            <span className="text-success">
              ${totalPagar.toLocaleString("es-CL")}
            </span>
          </ListGroup.Item>
        </ListGroup>

        <div className="d-grid gap-2">
          <Button variant="success" size="lg" onClick={onFinalizarCompra}>
            Confirmar Compra
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={onVaciarCarrito}
          >
            Vaciar Carrito
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}