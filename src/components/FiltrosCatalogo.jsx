// src/components/FiltrosCatalogo.jsx
import { Row, Col, Form } from "react-bootstrap";

function FiltrosCatalogo({
  categoria,
  setCategoria,
  categorias,
  filtroStock,
  setFiltroStock
}) {
  return (
    <div className="bg-white p-3 rounded shadow-sm border mb-4">
      <Row className="g-3">
        {/* Filtro por Categoría */}
        <Col xs={12} sm={6}>
          <Form.Group controlId="filtroCategoria">
            <Form.Label className="fw-semibold small text-secondary">Categoría</Form.Label>
            <Form.Select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categorias.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Filtro por Stock */}
        <Col xs={12} sm={6}>
          <Form.Group controlId="filtroStock">
            <Form.Label className="fw-semibold small text-secondary">Disponibilidad</Form.Label>
            <Form.Select
              value={filtroStock}
              onChange={(e) => setFiltroStock(e.target.value)}
            >
              <option value="todos">Todos los productos</option>
              <option value="disponible">Solo en Stock (Disponible)</option>
              <option value="agotado">Agotados</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default FiltrosCatalogo;