/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import {
  ROLES, autenticarUsuario, guardarSesion, obtenerSesion, cerrarSesion,
} from "../utils/persistenciaUsuarios";

const AuthContext = createContext(null);

const sinClave = ({ clave, ...resto }) => resto;

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const u = obtenerSesion();
    return u ? sinClave(u) : null;
  });

  const login = (correo, clave) => {
    const resultado = autenticarUsuario(correo, clave);
    if (resultado.exito) {
      guardarSesion(resultado.usuario.id);
      setUsuario(sinClave(resultado.usuario));
    }
    return resultado;
  };

  const logout = () => {
    cerrarSesion();
    setUsuario(null);
  };

  const esPersonal = usuario?.rol === ROLES.ADMIN || usuario?.rol === ROLES.VENDEDOR;
  const esAdmin = usuario?.rol === ROLES.ADMIN;

  return (
    <AuthContext.Provider value={{ usuario, login, logout, esPersonal, esAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
