const CLAVE_CARRITO = "ferreteria_los_maestros_carrito";

// Obtener carrito guardado
export const obtenerCarritoGuardado = () => {
  const guardado = localStorage.getItem(CLAVE_CARRITO);
  return guardado ? JSON.parse(guardado) : [];
};

// Guardar carrito en localStorage
export const guardarCarrito = (carrito) => {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
};

// Calcular totales
export const calcularTotalesCarrito = (carrito) => {
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const neto = Math.round(total / 1.19);
  const iva = total - neto;
  return { total, neto, iva };
};