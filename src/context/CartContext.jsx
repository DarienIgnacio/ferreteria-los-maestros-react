/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const CLAVE_CARRITO = "carrito_ferreteria_v1";
const CartContext = createContext(null);

function leerCarrito() {
  try {
    const l = JSON.parse(localStorage.getItem(CLAVE_CARRITO));
    return Array.isArray(l) ? l : [];
  } catch (e) {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(leerCarrito);
  const [aviso, setAviso] = useState(null); // { tipo, texto } para el toast

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
  }, [items]);

  const agregar = (producto, cantidad = 1) => {
    const existente = items.find((i) => i.codigo === producto.codigo);
    const enCarrito = existente ? existente.cantidad : 0;

    if (enCarrito + cantidad > producto.stock) {
      setAviso({ tipo: "warning", texto: `Solo hay ${producto.stock} unidades de "${producto.nombre}".` });
      return;
    }
    setItems((prev) =>
      existente
        ? prev.map((i) =>
            i.codigo === producto.codigo ? { ...i, cantidad: i.cantidad + cantidad, stock: producto.stock } : i
          )
        : [...prev, {
            codigo: producto.codigo, nombre: producto.nombre, precio: producto.precio,
            imagen: producto.imagen, stock: producto.stock, cantidad,
          }]
    );
    setAviso({ tipo: "success", texto: `"${producto.nombre}" añadido al carrito.` });
  };

  const cambiarCantidad = (codigo, cantidad) =>
    setItems((prev) =>
      prev.map((i) =>
        i.codigo === codigo ? { ...i, cantidad: Math.min(Math.max(1, cantidad), i.stock) } : i
      )
    );

  const quitar = (codigo) => setItems((prev) => prev.filter((i) => i.codigo !== codigo));
  const vaciar = () => setItems([]);

  const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);
  const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  return (
    <CartContext.Provider
      value={{ items, agregar, cambiarCantidad, quitar, vaciar, totalItems, total, aviso, cerrarAviso: () => setAviso(null) }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
