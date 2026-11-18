import { Navigate, Outlet } from "react-router-dom";

export default function RutaProtegida({ rolesPermitidos }) {
  const texto = sessionStorage.getItem("usuario");
  const usuario = texto ? JSON.parse(texto) : null;

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}