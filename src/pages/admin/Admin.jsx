import { useState } from "react";
import { Container } from "react-bootstrap";
import FormularioProducto from "../../components/FormularioProducto";
import TablaInventario from "../../components/TablaInventario";
import {
  obtenerProductos,
  guardarProductos,
} from "../../utils/persistenciaProductos";

export default function Admin() {
  const [productos, setProductos] = useState(obtenerProductos);
  const [productoEditando, setProductoEditando] = useState(null);

  const handleGuardarProducto = (productoForm) => {
    let nuevaLista;

    if (productoEditando) {
      nuevaLista = productos.map((p) =>
        p.codigo === productoForm.codigo ? productoForm : p
      );
      setProductoEditando(null);
    } else {
      const existe = productos.some((p) => p.codigo === productoForm.codigo);
      if (existe) {
        alert("Ya existe un producto con ese código.");
        return;
      }
      nuevaLista = [...productos, productoForm];
    }

    setProductos(nuevaLista);
    guardarProductos(nuevaLista);
  };

  const handleEliminarProducto = (codigo) => {
    if (window.confirm("¿Estás seguro de eliminar este producto del inventario?")) {
      const nuevaLista = productos.filter((p) => p.codigo !== codigo);
      setProductos(nuevaLista);
      guardarProductos(nuevaLista);
    }
  };

  return (
    <Container className="py-4">
      <div className="border-bottom pb-3 mb-4">
        <h1 className="h2 text-dark">Panel de Administración</h1>
        <p className="text-muted mb-0">
          Gestiona el catálogo, precios y disponibilidad de herramientas.
        </p>
      </div>

      {/* Subcomponente 1: Formulario */}
      <FormularioProducto
        productoEditando={productoEditando}
        onGuardar={handleGuardarProducto}
        onCancelarEdicion={() => setProductoEditando(null)}
      />

      {/* Subcomponente 2: Tabla */}
      <TablaInventario
        productos={productos}
        onEditar={(producto) => setProductoEditando(producto)}
        onEliminar={handleEliminarProducto}
      />
    </Container>
  );
}