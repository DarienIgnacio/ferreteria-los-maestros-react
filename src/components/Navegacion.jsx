import { Container, Nav, Navbar,Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navegacion({ totalCarrito = 0 }) {
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
            <Nav.Link as={NavLink} to="/carrito" className="btn btn-success btn-sm px-3 text-white fw-bold ms-md-2">
              🛒 Carrito <Badge bg="light" text="dark">{totalCarrito}</Badge>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/registro">Registrarse</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;