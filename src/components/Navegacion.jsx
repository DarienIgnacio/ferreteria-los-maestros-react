import { Container, Nav, Navbar, Badge, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

function Navegacion({ totalCarrito = 0, esAdmin = false, onLogout }) {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <Navbar expand="md" bg="dark" variant="dark" sticky="top" className="shadow-sm">
      <Container>        
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-warning">
          Ferretería Los Maestros
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" aria-label="Abrir o cerrar menú" />
        
        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto align-items-md-center">
            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          </Nav>

          {/* Sección derecha: Carrito y Estado de Sesión */}
          <Nav className="align-items-md-center gap-2 mt-2 mt-md-0">
            <Nav.Link 
              as={NavLink} 
              to="/carrito" 
              className="btn btn-success btn-sm px-3 text-white fw-bold me-md-2"
            >
              🛒 Carrito
              {totalCarrito > 0 && (
                <Badge bg="danger" pill className="ms-1">
                  {totalCarrito}
                </Badge>
              )}
            </Nav.Link>

            {/* Si inició sesión como Admin */}
            {esAdmin ? (
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-warning text-dark fw-bold">Modo Admin</span>
                <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link>
                <Button variant="outline-light" size="sm" onClick={handleCerrarSesion}>
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              /* Si es un usuario normal / visitante */
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