// src/components/TarjetaProducto.jsx
import { Link } from "react-router-dom";

function TarjetaProducto({ producto, onAgregarCarrito }) {
  const formatearPrecio = (valor) => `$${valor.toLocaleString("es-CL")}`;
  const estaAgotado = producto.stock === 0;

  return (
    <article className="card h-100">
    {/* Imagen*/}
      <img
        src={producto.imagen || "https://placeholder.com"}
        alt={producto.nombre}
        className="card-img-top"
      />
      
      {/* Estado Stock*/}
      <div className="card-body">
        <div className="status-badges">
          <span className="badge-secondary">{producto.categoria}</span>
          {!estaAgotado && producto.stock <= producto.stockCritico && (
            <span className="badge-danger">¡Últimas unidades!</span>
          )}
          {estaAgotado && <span className="badge-dark">Agotado</span>}
        </div>

        {/* Info producto */}
        <h2 className="product-title">{producto.nombre}</h2>
        <p className="product-description">{producto.descripcion}</p>
        <p className="product-price">{formatearPrecio(producto.precio)}</p>

        {/* BOTONES */}

        {/* Boton detalle */}
        <div className="card-actions">
          <Link to={`/productos/${producto.codigo}`} className="btn-secondary">
            Ver Detalle
          </Link><br></br>

          {/* Boton agregar (con/sin stock)*/}
          <button
            className="btn-primary"
            disabled={estaAgotado}
            onClick={() => onAgregarCarrito(producto)}
          >
            {estaAgotado ? "Sin Stock" : "Añadir al Carrito"}
          </button><br></br>
        </div>
      </div>
    </article>
  );
}

export default TarjetaProducto;
