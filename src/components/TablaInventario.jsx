import { Table, Button, Badge, Card } from "react-bootstrap";

export default function TablaInventario({
  productos,
  onEditar,
  onEliminar,
}) {
  const renderBadgeStock = (stock) => {
    if (stock === 0) return <Badge bg="danger">Agotado (0)</Badge>;
    if (stock <= 5) return <Badge bg="warning" text="dark">Bajo ({stock})</Badge>;
    return <Badge bg="success">{stock} unid.</Badge>;
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-white fw-bold py-3">
        Inventario Actual ({productos.length} productos)
      </Card.Header>
      <Card.Body className="p-0">
        <Table responsive hover className="mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No hay productos registrados en el inventario.
                </td>
              </tr>
            ) : (
              productos.map((prod) => (
                <tr key={prod.codigo}>
                  <td className="fw-bold text-secondary">{prod.codigo}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.categoria}</td>
                  <td>${prod.precio.toLocaleString("es-CL")}</td>
                  <td>{renderBadgeStock(prod.stock)}</td>
                  <td className="text-end">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => onEditar(prod)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onEliminar(prod.codigo)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}