import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";

import Inicio from "./pages/Inicio";
import NoEncontrada from "./pages/NoEncontrada";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";
import Admin from "./pages/admin/Admin";

import { obtenerCarritoGuardado, guardarCarrito } from "./utils/persistenciaCarrito";

function App() {
  const [carrito, setCarrito] = useState(obtenerCarritoGuardado);

  // 1. AÑADIDO: Incluimos setEsAdmin para poder cambiar el estado
  const [esAdmin, setEsAdmin] = useState(() => {
    return localStorage.getItem("sesion_admin") === "true";
  });

  // 2. AÑADIDO: Funciones para activar y desactivar la sesión de Admin
  const loginAdmin = () => {
    setEsAdmin(true);
    localStorage.setItem("sesion_admin", "true");
  };

  const logoutAdmin = () => {
    setEsAdmin(false);
    localStorage.removeItem("sesion_admin");
  };

  useEffect(() => {
    guardarCarrito(carrito);
  }, [carrito]);

  // Funciones del carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.codigo === producto.codigo);
      if (existe) {
        return prev.map((item) =>
          item.codigo === producto.codigo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    alert(`¡"${producto.nombre}" añadido al carrito!`);
  };

  const modificarCantidad = (codigo, cambio) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.codigo === codigo) {
            const nuevaCantidad = item.cantidad + cambio;
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const eliminarItem = (codigo) => {
    setCarrito((prev) => prev.filter((item) => item.codigo !== codigo));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Calcular el total de productos para la barra de navegación
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Pasar props de autenticación y carrito real a la navegación */}
      <Navegacion 
        totalCarrito={totalItems} 
        esAdmin={esAdmin} 
        onLogout={logoutAdmin} 
      />

      <main className="flex-grow-1">
        <Routes>          
          <Route path="/" element={<Inicio onAgregarCarrito={agregarAlCarrito}/>} />
          <Route path="/productos" element={<Productos onAgregarCarrito={agregarAlCarrito}/>} />
          <Route path="/productos/:codigo" element={<DetalleProducto onAgregarCarrito={agregarAlCarrito}/>} />
          <Route path="/login" element={<Login onLoginAdmin={loginAdmin} />} />
          
          {/* RUTA PROTEGIDA */}
          <Route 
            path="/admin" 
            element={esAdmin ? <Admin /> : <Navigate to="/login" replace />} 
          />
          
          <Route path="/registro" element={<Registro />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route 
            path="/carrito" 
            element={
              <Carrito 
                carrito={carrito} 
                onModificarCantidad={modificarCantidad} 
                onEliminarItem={eliminarItem}
                onVaciarCarrito={vaciarCarrito} 
              />
            } 
          />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>     
      </main>
      <PiePagina />
    </div>
  );
}

export default App;