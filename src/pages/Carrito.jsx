import { useState } from "react";
import { Container, Table, Button, Alert, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { obtenerProductos, actualizarProducto } from "../utils/persistenciaProductos";

const precio = (v) => `$${v.toLocaleString("es-CL")}`;
const rutaImg = (img) => (!img || img.startsWith("/") || img.startsWith("http") ? img : `/${img}`);

function Carrito() {
  const { items, cambiarCantidad, quitar, vaciar, total } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState(null);

  const finalizar = () => {
    if (!usuario) {
      navigate("/login", { state: { desde: "/carrito" } });
      return;
    }
    // Revisar stock actual antes de confirmar
    const catalogo = obtenerProductos();
    const sinStock = items.find((i) => (catalogo.find((p) => p.codigo === i.codigo)?.stock ?? 0) < i.cantidad);
    if (sinStock) {
      setMensaje({ tipo: "danger", texto: `No hay stock suficiente de "${sinStock.nombre}". Ajusta la cantidad.` });
      return;
    }
    items.forEach((i) => {
      const actual = catalogo.find((p) => p.codigo === i.codigo);
      actualizarProducto(i.codigo, { stock: actual.stock - i.cantidad });
    });
    vaciar();
    setMensaje({ tipo: "success", texto: "¡Compra realizada con éxito! Gracias por preferirnos." });
  };

  return (
    <Container className="py-4">
      <h1 className="h2 border-bottom pb-3 mb-4">Carrito de compras</h1>
      {mensaje && <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>}

      {items.length === 0 ? (
        <Alert variant="info" className="text-center py-4">
          <p className="mb-2">Tu carrito está vacío.</p>
          <Button as={Link} to="/productos" variant="warning">Ver catálogo</Button>
        </Alert>
      ) : (
        <>
          <div className="table-responsive bg-white shadow-sm rounded border">
            <Table className="align-middle mb-0">
              <thead>
                <tr><th>Producto</th><th>Precio</th><th style={{ width: 130 }}>Cantidad</th><th>Subtotal</th><th></th></tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.codigo}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img src={rutaImg(i.imagen)} alt="" width="48" height="48" style={{ objectFit: "contain" }} />
                        <Link to={`/productos/${i.codigo}`} className="text-decoration-none">{i.nombre}</Link>
                      </div>
                    </td>
                    <td>{precio(i.precio)}</td>
                    <td>
                      <Form.Control
                        type="number" min={1} max={i.stock} value={i.cantidad} size="sm"
                        aria-label={`Cantidad de ${i.nombre}`}
                        onChange={(e) => cambiarCantidad(i.codigo, Number(e.target.value) || 1)}
                      />
                    </td>
                    <td className="fw-bold">{precio(i.precio * i.cantidad)}</td>
                    <td className="text-end">
                      <Button variant="outline-danger" size="sm" onClick={() => quitar(i.codigo)}>Quitar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 gap-2">
            <Button variant="outline-secondary" onClick={vaciar}>Vaciar carrito</Button>
            <div className="text-end">
              <div className="fs-4 fw-bold">Total: {precio(total)}</div>
              <Button variant="success" size="lg" onClick={finalizar}>
                {usuario ? "Finalizar compra" : "Inicia sesión para comprar"}
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default Carrito;