import { productosIniciales } from "../data/productos";

const CLAVE_LOCALSTORAGE = "productos_ferreteria_v2";

// READ: Obtener todos los productos (o inicializar si no existen)
export function obtenerProductos() {
  const guardados = localStorage.getItem(CLAVE_LOCALSTORAGE);
  if (!guardados) {
    localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(productosIniciales));
    return productosIniciales;
  }
  try {
    return JSON.parse(guardados);
  } catch (e) {
    return productosIniciales;
  }
}

// CREATE: Guardar un nuevo producto
export function crearProducto(nuevoProducto) {
  const listaActual = obtenerProductos();
  const listaActualizada = [...listaActual, nuevoProducto];
  localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(listaActualizada));
  return listaActualizada;
}

// UPDATE: Actualizar un producto existente por su código
export function actualizarProducto(codigo, datosActualizados) {
  const listaActual = obtenerProductos();
  const listaActualizada = listaActual.map((prod) =>
    prod.codigo === codigo ? { ...prod, ...datosActualizados } : prod
  );
  localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(listaActualizada));
  return listaActualizada;
}

// DELETE: Eliminar un producto por su código
export function eliminarProducto(codigo) {
  const listaActual = obtenerProductos();
  const listaActualizada = listaActual.filter((prod) => prod.codigo !== codigo);
  localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(listaActualizada));
  return listaActualizada;
}