import { Container, Nav, Navbar, Badge } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navegacion() {
  const { usuario, esPersonal, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const salir = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar expand="md" bg="dark" variant="dark" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-warning">Ferretería Los Maestros</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" aria-label="Abrir o cerrar menú" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
            {esPersonal && <Nav.Link as={NavLink} to="/admin" className="text-warning">Panel</Nav.Link>}
          </Nav>
          <Nav className="align-items-md-center">
            <Nav.Link as={NavLink} to="/carrito" className="btn btn-success btn-sm px-3 text-white fw-bold me-md-2">
              🛒 Carrito <Badge bg="light" text="dark">{totalItems}</Badge>
            </Nav.Link>
            {usuario ? (
              <>
                <Navbar.Text className="me-md-2">Hola, {usuario.nombre.split(" ")[0]}</Navbar.Text>
                <Nav.Link as="button" className="btn btn-link" onClick={salir}>Salir</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/registro">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;
