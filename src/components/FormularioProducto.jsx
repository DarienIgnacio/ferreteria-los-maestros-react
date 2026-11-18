import { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";

export default function FormularioProducto({
  categorias = [],
  productoEditando,
  onGuardar,
  onCancelarEdicion,
}) {
  const estadoInicial = {
    codigo: "",
    nombre: "",
    categoriaId: "",
    precio: "",
    stock: "",
    imagen: "",
    descripcion: "",
  };

  const [formulario, setFormulario] = useState(estadoInicial);
  const [error, setError] = useState("");

  useEffect(() => {
    if (productoEditando) {
      setFormulario({
        ...productoEditando,
        categoriaId: productoEditando.categoria?.id || "",
      });
      setError("");
    } else {
      setFormulario({
        ...estadoInicial,
        categoriaId: categorias[0]?.id || "",
      });
    }
  }, [productoEditando, categorias]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]:
        name === "precio" || name === "stock" || name === "categoriaId"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formulario.codigo.trim() || !formulario.nombre.trim() || !formulario.categoriaId) {
      setError("Código, nombre y categoría son obligatorios.");
      return;
    }
    if (formulario.precio <= 0 || formulario.stock < 0) {
      setError("El precio debe ser mayor a 0 y el stock no puede ser negativo.");
      return;
    }

    setError("");
    const payload = {
      codigo: formulario.codigo,
      nombre: formulario.nombre,
      descripcion: formulario.descripcion,
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      imagen: formulario.imagen,
      categoria: { id: Number(formulario.categoriaId) },
    };

    onGuardar(payload);
    setFormulario({ ...estadoInicial, categoriaId: categorias[0]?.id || "" });
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-dark text-white fw-bold">
        {productoEditando ? "Editar Producto" : "Agregar Nuevo Producto"}
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="codigo"
                  placeholder="Ej: TAL-001"
                  value={formulario.codigo}
                  onChange={handleChange}
                  disabled={!!productoEditando}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={8}>
              <Form.Group>
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="categoriaId"
                  value={formulario.categoriaId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona categoría...</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Precio ($)</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  min="1"
                  value={formulario.precio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Stock Disponible</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  min="0"
                  value={formulario.stock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  name="descripcion"
                  value={formulario.descripcion || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>URL de Imagen</Form.Label>
                <Form.Control
                  type="text"
                  name="imagen"
                  placeholder="https://..."
                  value={formulario.imagen || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-4 d-flex gap-2">
            <Button type="submit" variant={productoEditando ? "warning" : "success"}>
              {productoEditando ? "Guardar Cambios" : "Crear Producto"}
            </Button>
            {productoEditando && (
              <Button variant="secondary" onClick={onCancelarEdicion}>
                Cancelar
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}