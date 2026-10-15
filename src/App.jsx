import { Routes, Route } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";
import RutaProtegida from "./components/RutaProtegida";
import Inicio from "./pages/Inicio";
import NoEncontrada from "./pages/NoEncontrada";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import { useCart } from "./context/CartContext";
import { ROLES } from "./utils/persistenciaUsuarios";

function App() {
  const { aviso, cerrarAviso } = useCart();

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navegacion />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:codigo" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/admin"
            element={
              <RutaProtegida roles={[ROLES.ADMIN, ROLES.VENDEDOR]}>
                <Admin />
              </RutaProtegida>
            }
          />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <PiePagina />

      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 2000 }}>
        <Toast show={Boolean(aviso)} onClose={cerrarAviso} delay={2500} autohide bg={aviso?.tipo}>
          <Toast.Body className={aviso?.tipo === "success" ? "text-white" : ""}>{aviso?.texto}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
