const TIENDA_URL = import.meta.env.VITE_TIENDA_API_URL;

async function request(ruta, opciones = {}) {
  const token = sessionStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...opciones.headers,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${TIENDA_URL}${ruta}`, {
    ...opciones,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error("Sesión expirada o no autorizada (401)");
    if (response.status === 403) throw new Error("No tienes permisos para esta acción (403)");
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Error en la solicitud (${response.status})`);
  }

  return response.status === 204 ? null : response.json();
}

// Categorías
export const listarCategorias = () => request("/categorias");

// Productos (CRUD)
export const listarProductos = () => request("/productos");
export const buscarProducto = (id) => request(`/productos/${id}`);
export const crearProducto = (datos) =>
  request("/productos", { method: "POST", body: JSON.stringify(datos) });
export const actualizarProducto = (id, datos) =>
  request(`/productos/${id}`, { method: "PUT", body: JSON.stringify(datos) });
export const eliminarProducto = (id) =>
  request(`/productos/${id}`, { method: "DELETE" });

// Boletas / Órdenes
export const crearBoleta = (items) =>
  request("/boletas", { method: "POST", body: JSON.stringify({ items }) });
export const listarTodasBoletas = () => request("/boletas");
export const listarMisCompras = () => request("/boletas/mis-compras");