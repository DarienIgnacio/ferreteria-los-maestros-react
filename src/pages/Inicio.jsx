import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";
import { listarProductos } from "../services/tiendaService";

export default function Inicio({ onAgregarCarrito }) {
  const [destacados, setDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarDestacados() {
      try {
        const data = await listarProductos();
        const normalizados = data.map((p) => ({
          ...p,
          categoria: p.categoria?.nombre || "General",
        }));
        // Muestra hasta los primeros 4 productos del backend como destacados
        setDestacados(normalizados.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    cargarDestacados();
  }, []);

  return (
    <div>
      {/* Banner principal */}
      <div className="bg-dark text-white py-5 mb-5">
        <Container className="text-center py-3">
          <h1 className="display-5 fw-bold text-warning">Ferretería Los Maestros</h1>
          <p className="lead mb-4">
            Herramientas profesionales, materiales de construcción y equipamiento para tus proyectos.
          </p>
          <Button as={Link} to="/productos" variant="warning" size="lg" className="fw-bold">
            Ver Catálogo Completo
          </Button>
        </Container>
      </div>

      {/* Sección de Productos Destacados desde el Backend */}
      <Container className="mb-5">
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
          <h2 className="h3 mb-0">Herramientas Destacadas</h2>
          <Link to="/productos" className="text-decoration-none fw-bold">
            Ver todos →
          </Link>
        </div>

        {cargando ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : destacados.length === 0 ? (
          <Alert variant="info">No hay productos registrados en el catálogo aún.</Alert>
        ) : (
          <Row className="g-3">
            {destacados.map((prod) => (
              <Col key={prod.id} xs={12} sm={6} md={4} lg={3}>
                <TarjetaProducto
                  producto={prod}
                  onAgregarCarrito={onAgregarCarrito}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}