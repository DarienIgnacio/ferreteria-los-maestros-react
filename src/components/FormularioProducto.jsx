import { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";

export default function FormularioProducto({
  productoEditando,
  onGuardar,
  onCancelarEdicion,
}) {
  const estadoInicial = {
    codigo: "",
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    imagen: "",
    descripcion: "",
  };

  const [formulario, setFormulario] = useState(estadoInicial);
  const [error, setError] = useState("");

  // Sincroniza el formulario cuando se selecciona un producto para editar
  useEffect(() => {
    if (productoEditando) {
      setFormulario(productoEditando);
      setError("");
    } else {
      setFormulario(estadoInicial);
    }
  }, [productoEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: name === "precio" || name === "stock" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formulario.codigo.trim() || !formulario.nombre.trim()) {
      setError("El código y el nombre del producto son obligatorios.");
      return;
    }

    if (formulario.precio <= 0 || formulario.stock < 0) {
      setError("El precio debe ser mayor a 0 y el stock no puede ser negativo.");
      return;
    }

    setError("");
    onGuardar(formulario);
    setFormulario(estadoInicial);
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
              <Form.Group controlId="formCodigo">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="codigo"
                  placeholder="Ej: TAL-001"
                  value={formulario.codigo}
                  onChange={handleChange}
                  disabled={!!productoEditando} // Bloquea el código al editar
                  required
                />
              </Form.Group>
            </Col>

            <Col md={8}>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Ej: Taladro Percutor 650W"
                  value={formulario.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formCategoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="categoria"
                  placeholder="Ej: Herramientas Eléctricas"
                  value={formulario.categoria}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formPrecio">
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
              <Form.Group controlId="formStock">
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

            <Col md={12}>
              <Form.Group controlId="formImagen">
                <Form.Label>URL de Imagen</Form.Label>
                <Form.Control
                  type="text"
                  name="imagen"
                  placeholder="https://..."
                  value={formulario.imagen}
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