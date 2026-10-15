import { Routes, Route } from "react-router-dom";
import { useState } from "react";
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


function App() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
    alert(`¡"${producto.nombre}" añadido al carrito!`);
  };
  
  return (    
  <div className="d-flex flex-column min-vh-100 bg-light">
    <Navegacion totalCarrito={0} />
      <main className="flex-grow-1">
        <Routes>          
          <Route path="/" element={<Inicio onAgregarCarrito={agregarAlCarrito}/>} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:codigo" element={<DetalleProducto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>     
       </main>
    <PiePagina />
  </div>  );
}

export default App;
