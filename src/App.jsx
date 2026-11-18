import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";
import RutaProtegida from "./components/RutaProtegida";

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
import Ordenes from "./pages/Ordenes";

import { obtenerCarritoGuardado, guardarCarrito } from "./utils/persistenciaCarrito";

function App() {
  const [carrito, setCarrito] = useState(obtenerCarritoGuardado);

  // Sesión persistente desde sessionStorage[cite: 25]
  const [usuario, setUsuario] = useState(() => {
    const guardado = sessionStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  const handleLoginExitoso = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    setUsuario(null);
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

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navegacion
        totalCarrito={totalItems}
        usuario={usuario}
        onLogout={handleLogout}
      />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio onAgregarCarrito={agregarAlCarrito} />} />
          <Route
            path="/productos"
            element={<Productos onAgregarCarrito={agregarAlCarrito} usuario={usuario} />}
          />
          <Route
            path="/productos/:codigo"
            element={<DetalleProducto onAgregarCarrito={agregarAlCarrito} />}
          />
          <Route path="/login" element={<Login onLoginExitoso={handleLoginExitoso} />} />
          <Route path="/registro" element={<Registro onLoginExitoso={handleLoginExitoso} />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                usuario={usuario}
                onModificarCantidad={modificarCantidad}
                onEliminarItem={eliminarItem}
                onVaciarCarrito={vaciarCarrito}
              />
            }
          />

          {/* RUTA PROTEGIDA SOLO PARA ADMIN */}
          <Route element={<RutaProtegida rolesPermitidos={["ADMIN"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          {/* RUTA PROTEGIDA PARA VENDEDOR Y ADMIN */}
          <Route element={<RutaProtegida rolesPermitidos={["ADMIN", "VENDEDOR"]} />}>
            <Route path="/vendedor/ordenes" element={<Ordenes />} />
          </Route>

          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <PiePagina />
    </div>
  );
}

export default App;