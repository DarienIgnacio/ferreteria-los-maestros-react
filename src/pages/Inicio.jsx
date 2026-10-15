import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";
import { obtenerProductos } from "../utils/persistenciaProductos";

function Inicio({ onAgregarCarrito }) {
  const productos = obtenerProductos();
  const destacados = productos.slice(0, 4);

  return (
    <Container className="py-4">
      {/* Hero Banner Limpio */}
      <div className="bg-white p-4 p-md-5 rounded shadow-sm text-center mb-5 border">
        <h1 className="fw-bold text-dark mb-2">Ferretería Los Maestros</h1>
        <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: "600px" }}>
          Herramientas y materiales de construcción con envío a toda la región.
        </p>
        <Button as={Link} to="/productos" variant="warning" size="lg" className="fw-bold px-4">
          Ver Catálogo
        </Button>
      </div>

      {/* Productos Destacados */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 fw-bold text-dark mb-0">Productos Destacados</h2>
          <Button as={Link} to="/productos" variant="link" className="text-decoration-none">
            Ver todos →
          </Button>
        </div>

        <Row className="g-3">
          {destacados.map((prod) => (
            <Col key={prod.codigo} xs={12} sm={6} md={3}>
              <TarjetaProducto producto={prod} onAgregarCarrito={onAgregarCarrito} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default Inicio;