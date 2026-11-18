import { useState, useEffect } from "react";
import { Container, Table, Badge, Button, Modal, Alert, Spinner } from "react-bootstrap";
import { listarTodasBoletas } from "../services/tiendaService";

export default function Ordenes() {
  const [boletas, setBoletas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null);

  useEffect(() => {
    async function cargarOrdenes() {
      try {
        const data = await listarTodasBoletas();
        setBoletas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    cargarOrdenes();
  }, []);

  if (cargando) return <Container className="py-5 text-center"><Spinner animation="border" /></Container>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="py-4">
      <div className="border-bottom pb-3 mb-4">
        <h1 className="h2 text-dark">Órdenes y Boletas Emitidas</h1>
        <p className="text-muted mb-0">Listado general de ventas registradas en el sistema.</p>
      </div>

      {boletas.length === 0 ? (
        <Alert variant="info">Aún no se han registrado órdenes de compra.</Alert>
      ) : (
        <Table responsive hover className="bg-white shadow-sm align-middle">
          <thead className="table-dark">
            <tr>
              <th>N° Boleta</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Total</th>
              <th className="text-end">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {boletas.map((b) => (
              <tr key={b.id}>
                <td className="fw-bold">#{b.id}</td>
                <td>{new Date(b.fecha).toLocaleString("es-CL")}</td>
                <td>{b.clienteCorreo}</td>
                <td className="fw-bold text-success">${b.total.toLocaleString("es-CL")}</td>
                <td className="text-end">
                  <Button size="sm" variant="outline-primary" onClick={() => setBoletaSeleccionada(b)}>
                    Ver Detalle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal con el detalle de la boleta */}
      <Modal show={!!boletaSeleccionada} onHide={() => setBoletaSeleccionada(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalle Boleta #{boletaSeleccionada?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {boletaSeleccionada && (
            <>
              <p><strong>Cliente:</strong> {boletaSeleccionada.clienteCorreo}</p>
              <p><strong>Fecha:</strong> {new Date(boletaSeleccionada.fecha).toLocaleString("es-CL")}</p>
              <Table bordered size="sm">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio Unit.</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {boletaSeleccionada.detalles.map((d) => (
                    <tr key={d.id}>
                      <td>{d.producto?.nombre}</td>
                      <td>${d.precioUnitario.toLocaleString("es-CL")}</td>
                      <td>{d.cantidad}</td>
                      <td>${d.subtotal.toLocaleString("es-CL")}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <h5 className="text-end mt-3">
                Total Pagado: <Badge bg="success">${boletaSeleccionada.total.toLocaleString("es-CL")}</Badge>
              </h5>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}