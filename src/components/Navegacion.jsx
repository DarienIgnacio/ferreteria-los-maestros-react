import { Container, Nav, Navbar, Button, Badge } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

function Navegacion({ usuario, totalCarrito = 0, onLogout }) {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    if (onLogout) onLogout();
    navigate("/login");
  };

  const esVendedor = usuario?.rol === "VENDEDOR";
  const esAdmin = usuario?.rol === "ADMIN";

  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand
          as={NavLink}
          to={esVendedor ? "/vendedor/ordenes" : "/"}
          className="fw-bold text-warning text-nowrap"
        >
          Ferretería Los Maestros
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" aria-label="Abrir o cerrar menú" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto align-items-lg-center">
            {esVendedor ? (
              <>
                <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
                <Nav.Link as={NavLink} to="/vendedor/ordenes">Órdenes</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
                <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
                <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
                <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="align-items-lg-center gap-2 mt-2 mt-lg-0">
            {!esVendedor && (
              <Nav.Link
                as={NavLink}
                to="/carrito"
                className="btn btn-success btn-sm px-2 text-white fw-bold text-nowrap"
              >
                🛒 Carrito {totalCarrito > 0 && `(${totalCarrito})`}
              </Nav.Link>
            )}

            {usuario ? (
              <div className="d-flex flex-wrap align-items-center gap-2">
                {esAdmin && (
                  <>
                    <Nav.Link as={NavLink} to="/admin" className="text-nowrap">
                      Inventario
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/vendedor/ordenes" className="text-nowrap">
                      Órdenes
                    </Nav.Link>
                  </>
                )}

                <Badge
                  bg={esAdmin ? "warning" : esVendedor ? "info" : "secondary"}
                  text="dark"
                  title={usuario.nombre}
                >
                  {usuario.rol}
                </Badge>

                <Button
                  variant="outline-light"
                  size="sm"
                  className="text-nowrap"
                  onClick={handleCerrarSesion}
                >
                  Salir
                </Button>
              </div>
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