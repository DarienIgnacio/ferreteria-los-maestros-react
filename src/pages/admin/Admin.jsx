import { useState, useEffect } from "react";
import { Container, Alert, Spinner } from "react-bootstrap";
import FormularioProducto from "../../components/FormularioProducto";
import TablaInventario from "../../components/TablaInventario";
import {
  listarProductos,
  listarCategorias,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../../services/tiendaService";

export default function Admin() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarDatos = async () => {
    try {
      setError("");
      const [prodsData, catsData] = await Promise.all([
        listarProductos(),
        listarCategorias(),
      ]);
      setProductos(prodsData);
      setCategorias(catsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleGuardarProducto = async (payload) => {
    try {
      setError("");
      if (productoEditando) {
        await actualizarProducto(productoEditando.id, payload);
        setProductoEditando(null);
      } else {
        await crearProducto(payload);
      }
      await cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEliminarProducto = async (codigo) => {
    const prod = productos.find((p) => p.codigo === codigo);
    if (!prod) return;

    if (window.confirm(`¿Estás seguro de eliminar "${prod.nombre}" del inventario?`)) {
      try {
        setError("");
        await eliminarProducto(prod.id);
        await cargarDatos();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (cargando) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  // Normalizamos categoria para TablaInventario
  const productosTabla = productos.map((p) => ({
    ...p,
    categoria: p.categoria?.nombre || "Sin categoría",
  }));

  return (
    <Container className="py-4">
      <div className="border-bottom pb-3 mb-4">
        <h1 className="h2 text-dark">Panel de Administración</h1>
        <p className="text-muted mb-0">
          Gestiona el catálogo, precios y disponibilidad de herramientas en tiempo real.
        </p>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <FormularioProducto
        categorias={categorias}
        productoEditando={productoEditando}
        onGuardar={handleGuardarProducto}
        onCancelarEdicion={() => setProductoEditando(null)}
      />

      <TablaInventario
        productos={productosTabla}
        onEditar={(prodTabla) => {
          const original = productos.find((p) => p.id === prodTabla.id);
          setProductoEditando(original);
        }}
        onEliminar={handleEliminarProducto}
      />
    </Container>
  );
}