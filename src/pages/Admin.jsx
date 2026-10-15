import { Container, Tabs, Tab, Badge } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import AdminProductos from "../components/AdminProductos";
import AdminUsuarios from "../components/AdminUsuarios";

function Admin() {
  const { usuario, esAdmin } = useAuth();

  return (
    <Container className="py-4">
      <div className="border-bottom pb-3 mb-4 d-flex flex-wrap justify-content-between align-items-center gap-2">
        <h1 className="h2 mb-0">Panel de administración</h1>
        <span>
          {usuario.nombre} <Badge bg={esAdmin ? "danger" : "info"}>{usuario.rol}</Badge>
        </span>
      </div>

      <Tabs defaultActiveKey="productos" className="mb-3">
        <Tab eventKey="productos" title="Productos">
          <AdminProductos puedeEliminar={esAdmin} />
        </Tab>
        {esAdmin && (
          <Tab eventKey="usuarios" title="Usuarios">
            <AdminUsuarios usuarioActual={usuario} />
          </Tab>
        )}
      </Tabs>
    </Container>
  );
}

export default Admin;
