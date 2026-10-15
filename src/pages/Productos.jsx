// src/pages/Productos.jsx
import { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import TarjetaProducto from "../components/TarjetaProducto";
import FiltrosCatalogo from "../components/FiltrosCatalogo";
import { obtenerProductos } from "../utils/persistenciaProductos";

function Productos({ onAgregarCarrito }) {
  const productos = obtenerProductos();
  const [categoria, setCategoria] = useState("");
  const [filtroStock, setFiltroStock] = useState("todos"); 

  // Extraer lista única de categorías
  const categorias = [];
  productos.forEach((p) => {
    if (p.categoria && !categorias.includes(p.categoria)) {
      categorias.push(p.categoria);
    }
  });

  // Filtrado directo por Categoría y Disponibilidad de Stock
  const productosFiltrados = productos.filter((prod) => {
    const coincideCategoria = categoria ? prod.categoria === categoria : true;

    let coincideStock = true;
    if (filtroStock === "disponible") {
      coincideStock = prod.stock > 0;
    } else if (filtroStock === "agotado") {
      coincideStock = prod.stock === 0;
    }

    return coincideCategoria && coincideStock;
  });

  return (
    <Container className="py-4">
      <div className="border-bottom pb-3 mb-4">
        <h1 className="h2 text-dark">Catálogo de Productos</h1>
        <p className="text-muted mb-0">
          Filtra nuestras herramientas por categoría y disponibilidad en tienda.
        </p>
      </div>

      {/* Componente de Filtros simplificado (Categoría + Stock) */}
      <FiltrosCatalogo
        categoria={categoria}
        setCategoria={setCategoria}
        categorias={categorias}
        filtroStock={filtroStock}
        setFiltroStock={setFiltroStock}
      />

      {/* Listado de Productos */}
      {productosFiltrados.length === 0 ? (
        <Alert variant="warning" className="text-center py-4">
          <h5>No se encontraron productos</h5>
          <p className="mb-0">Prueba seleccionando otra categoría o cambiando la opción de disponibilidad.</p>
        </Alert>
      ) : (
        <Row className="g-3">
          {productosFiltrados.map((prod) => (
            <Col key={prod.codigo} xs={12} sm={6} md={4} lg={3}>
              <TarjetaProducto
                producto={prod}
                onAgregarCarrito={onAgregarCarrito}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Productos;