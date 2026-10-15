import { useState } from "react";
import { Container, Table, Button, Modal, Form, Badge, Row, Col, Card } from "react-bootstrap";
import { obtenerProductos, guardarProductos } from "../../utils/persistenciaProductos";
function Admin() {
  const [productos, setProductos] = useState(obtenerProductos);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  // Formulario de Producto
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    categoria: "Herramientas Manuales",
    precio: "",
    stock: "",
    descripcion: "",
    imagen: ""
  });

  // Abrir Modal para Crear
  const handleCrear = () => {
    setModoEdicion(false);
    setForm({
      codigo: `HERR-${Math.floor(100 + Math.random() * 900)}`,
      nombre: "",
      categoria: "Herramientas Manuales",
      precio: "",
      stock: "",
      descripcion: "",
      imagen: ""
    });
    setModalAbierto(true);
  };

  // Abrir Modal para Editar
  const handleEditar = (prod) => {
    setModoEdicion(true);
    setForm({ ...prod });
    setModalAbierto(true);
  };

  const handleCerrarModal = () => setModalAbierto(false);

  // Manejar cambios en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Guardar datos (Crear o Modificar)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.precio || !form.stock) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    let listaActualizada = [];

    if (modoEdicion) {
      listaActualizada = productos.map((item) =>
        item.codigo === form.codigo
          ? { ...form, precio: Number(form.precio), stock: Number(form.stock) }
          : item
      );
    } else {
      const nuevo = {
        ...form,
        precio: Number(form.precio),
        stock: Number(form.stock),
        imagen: form.imagen || "https://placehold.co/300x300?text=Producto"
      };
      listaActualizada = [...productos, nuevo];
    }

    setProductos(listaActualizada);
    guardarProductos(listaActualizada); // Guardar en localStorage
    handleCerrarModal();
  };

  // Eliminar producto
  const handleEliminar = (codigo) => {
    if (window.confirm(`¿Seguro que deseas eliminar el producto ${codigo}?`)) {
      const listaActualizada = productos.filter((item) => item.codigo !== codigo);
      setProductos(listaActualizada);
      guardarProductos(listaActualizada);
    }
  };

  const formatearMoneda = (val) => `$${Number(val).toLocaleString("es-CL")}`;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
        <div>
          <h1 className="h2 text-dark mb-1">Administración de Inventario</h1>
          <p className="text-muted mb-0">Crea, edita y elimina productos del catálogo.</p>
        </div>
        <Button variant="success" className="fw-bold" onClick={handleCrear}>
          ➕ Nuevo Producto
        </Button>
      </div>

      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <Table responsive hover className="align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>SKU</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th className="text-end">Precio</th>
                <th className="text-center">Stock</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.codigo}>
                  <td className="fw-bold text-secondary">{prod.codigo}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={prod.imagen || "https://placehold.co/50x50?text=S/I"}
                        alt={prod.nombre}
                        style={{ width: "40px", height: "40px", objectFit: "contain" }}
                        className="rounded border bg-white p-1"
                      />
                      <span className="fw-bold text-dark">{prod.nombre}</span>
                    </div>
                  </td>
                  <td>
                    <Badge bg="secondary">{prod.categoria}</Badge>
                  </td>
                  <td className="text-end fw-bold">{formatearMoneda(prod.precio)}</td>
                  <td className="text-center">
                    {prod.stock > 0 ? (
                      <Badge bg="success">{prod.stock} un.</Badge>
                    ) : (
                      <Badge bg="danger">Agotado</Badge>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEditar(prod)}
                      >
                        ✏️
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleEliminar(prod.codigo)}
                      >
                        🗑️
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* MODAL CREAR / EDITAR */}
      <Modal show={modalAbierto} onHide={handleCerrarModal} backdrop="static" centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">
              {modoEdicion ? "Editar Producto" : "Nuevo Producto"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-3">
              <Col xs={6}>
                <Form.Group controlId="codigo">
                  <Form.Label className="small fw-bold">SKU / Código</Form.Label>
                  <Form.Control
                    type="text"
                    name="codigo"
                    value={form.codigo}
                    onChange={handleChange}
                    disabled={modoEdicion}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="categoria">
                  <Form.Label className="small fw-bold">Categoría</Form.Label>
                  <Form.Select
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                  >
                    <option value="Herramientas Manuales">Herramientas Manuales</option>
                    <option value="Herramientas Eléctricas">Herramientas Eléctricas</option>
                    <option value="Materiales de Construcción">Materiales de Construcción</option>
                    <option value="Pinturas y Acabados">Pinturas y Acabados</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="nombre">
                  <Form.Label className="small fw-bold">Nombre del Producto</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="precio">
                  <Form.Label className="small fw-bold">Precio ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="stock">
                  <Form.Label className="small fw-bold">Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="imagen">
                  <Form.Label className="small fw-bold">URL Imagen (Opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="imagen"
                    placeholder="https://..."
                    value={form.imagen}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCerrarModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {modoEdicion ? "Guardar Cambios" : "Crear Producto"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default Admin;