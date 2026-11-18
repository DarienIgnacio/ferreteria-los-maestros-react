import { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import TarjetaProducto from "../components/TarjetaProducto";
import FiltrosCatalogo from "../components/FiltrosCatalogo";
import { listarProductos } from "../services/tiendaService";

function Productos({ onAgregarCarrito, usuario }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [categoria, setCategoria] = useState("");
  const [filtroStock, setFiltroStock] = useState("todos");

  useEffect(() => {
    async function cargarCatalogo() {
      try {
        setError("");
        const data = await listarProductos();
        // Normalizamos categoria para mantener compatibilidad con TarjetaProducto y FiltrosCatalogo
        const normalizados = data.map((p) => ({
          ...p,
          categoriaNombre: p.categoria?.nombre || "Sin categoría",
        }));
        setProductos(normalizados);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    cargarCatalogo();
  }, []);

  // Extraer lista única de nombres de categorías
  const categorias = [
    ...new Set(productos.map((p) => p.categoriaNombre).filter(Boolean)),
  ];

  // Filtrado por Categoría y Disponibilidad de Stock
  const productosFiltrados = productos.filter((prod) => {
    const coincideCategoria = categoria ? prod.categoriaNombre === categoria : true;

    let coincideStock = true;
    if (filtroStock === "disponible") {
      coincideStock = prod.stock > 0;
    } else if (filtroStock === "agotado") {
      coincideStock = prod.stock === 0;
    }

    return coincideCategoria && coincideStock;
  });

  if (cargando) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Cargando catálogo desde el servidor...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Error al cargar productos: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="border-bottom pb-3 mb-4">
        <h1 className="h2 text-dark">Catálogo de Productos</h1>
        <p className="text-muted mb-0">
          Filtra nuestras herramientas por categoría y disponibilidad en tienda.
        </p>
      </div>

      <FiltrosCatalogo
        categoria={categoria}
        setCategoria={setCategoria}
        categorias={categorias}
        filtroStock={filtroStock}
        setFiltroStock={setFiltroStock}
      />

      {productosFiltrados.length === 0 ? (
        <Alert variant="warning" className="text-center py-4">
          <h5>No se encontraron productos</h5>
          <p className="mb-0">
            Prueba seleccionando otra categoría o cambiando la opción de disponibilidad.
          </p>
        </Alert>
      ) : (
        <Row className="g-3">
          {productosFiltrados.map((prod) => (
            <Col key={prod.id} xs={12} sm={6} md={4} lg={3}>
              <TarjetaProducto
                producto={{ ...prod, categoria: prod.categoriaNombre }}
                onAgregarCarrito={usuario?.rol === "VENDEDOR" ? null : onAgregarCarrito}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Productos;