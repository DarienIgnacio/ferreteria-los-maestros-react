import { Card, Button, Badge } from "react-bootstrap"; // <-- Asegúrate de que Card esté aquí
import { Link } from "react-router-dom";

function TarjetaProducto({ producto, onAgregarCarrito }) {
  const formatearPrecio = (valor) => `$${valor.toLocaleString("es-CL")}`;

  return (
    <Card className="h-100 shadow-sm border-0">
      {/* Imagen*/}
      <div
        className="text-center bg-light p-2 rounded-top"
        style={{
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Img
          variant="top"
          src={producto.imagen || "https://via.placeholder.com/300x200?text=Ferreter%C3%ADa"}
          alt={producto.nombre}
          className="img-fluid"
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
        />
      </div>

        {/* Estado Stock*/}
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge bg="secondary" className="me-1">
            {producto.categoria}
          </Badge>
          {producto.stock > 0 && producto.stock <= producto.stockCritico && (
            <Badge bg="danger">¡Últimas unidades!</Badge>
          )}
          {producto.stock === 0 && <Badge bg="dark">Agotado</Badge>}
        </div>

         {/* Info producto */}
        <Card.Title className="h6 text-truncate" title={producto.nombre}>{producto.nombre}</Card.Title>
        <Card.Text className="small text-muted flex-grow-1 text-truncate-2">{producto.descripcion}</Card.Text>
        <div className="my-2 fw-bold text-primary fs-5">{formatearPrecio(producto.precio)}</div>

          {/* BOTONES */}
        
        {/* Boton detalle */}
        <div className="d-grid gap-2">
          <Button
            as={Link}
            to={`/productos/${producto.codigo}`}
            variant="outline-secondary"
            size="sm"
          >
            Ver Detalle
          </Button>
          
          {/* Boton agregar (con/sin stock)*/}
          <Button
            variant={producto.stock === 0 ? "secondary" : "primary"}
            size="sm"
            disabled={producto.stock === 0}
            onClick={() => onAgregarCarrito(producto)}
          >
            {producto.stock === 0 ? "Sin Stock" : "Añadir al Carrito"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProducto;