import { useState, useEffect } from "react";
import TarjetaProducto from "../components/TarjetaProducto";
import { obtenerProductos } from "../utils/persistenciaProductos";

function Productos({ onAgregarCarrito }) {
  const [listaProductos, setListaProductos] = useState([]);
  const [categoriaSel, setCategoriaSel] = useState("Todas");
  const [soloStock, setSoloStock] = useState(false);

  useEffect(() => {
    setListaProductos(obtenerProductos());
  }, []);

  const productosFiltrados = listaProductos.filter((prod) => {
    const coincideCategoria =
      categoriaSel === "Todas" || prod.categoria === categoriaSel;
    const coincideStock = soloStock ? prod.stock > 0 : true;
    return coincideCategoria && coincideStock;
  });

  return (
    <main className="container py-4">
      <header className="page-header">
        <h1>Catálogo de Productos</h1>
        <p>Encuentra los materiales y herramientas disponibles en tiempo real.</p><br></br>
      </header>

      {/* Barra de Filtros */}
      <section className="filter-bar">
        <div className="filter-group">
          <label htmlFor="filtroCategoria">Filtrar por Categoría</label>
          <select id="filtroCategoria" value={categoriaSel} onChange={(e) => setCategoriaSel(e.target.value)} className="form-select">
            <option value="Todas">Todas las categorías</option>
            <option value="Herramientas">Herramientas</option>
            <option value="Materiales de Construcción">Materiales de Construcción</option>
            <option value="Herramientas Eléctricas">Herramientas Eléctricas</option>
            <option value="Pinturas">Pinturas</option>
          </select>
        </div>

        <div className="filter-check">
          <input type="checkbox" id="switch-stock" checked={soloStock} onChange={(e) => setSoloStock(e.target.checked)}/>
          <label htmlFor="switch-stock">Mostrar solo con stock disponible</label>
        </div><br></br>
      </section>

      {/* Listado o catálogo */}
      {productosFiltrados.length === 0 ? (
        <div className="no-results">
          <p>No se encontraron productos que coincidan con los filtros seleccionados.</p>
        </div>
      ) : (
        <div className="product-grid">
          {productosFiltrados.map((prod) => (
            <TarjetaProducto
              key={prod.codigo}
              producto={prod}
              onAgregarCarrito={onAgregarCarrito}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Productos;
