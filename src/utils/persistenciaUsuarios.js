const CLAVE_USUARIOS = "usuarios_ferreteria_v1";

// Obtener lista de usuarios registrados
export function obtenerUsuarios() {
  const guardados = localStorage.getItem(CLAVE_USUARIOS);
  if (!guardados) return [];
  try {
    return JSON.parse(guardados);
  } catch (e) {
    return [];
  }
}

// Registrar un nuevo usuario
export function registrarUsuario(nuevoUsuario) {
  const usuarios = obtenerUsuarios();
  
  // Verificar si el correo ya está registrado
  const existe = usuarios.some(
    (u) => u.correo.toLowerCase() === nuevoUsuario.correo.toLowerCase()
  );
  
  if (existe) {
    return { exito: false, mensaje: "El correo electrónico ya se encuentra registrado." };
  }

  const listaActualizada = [...usuarios, nuevoUsuario];
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(listaActualizada));
  return { exito: true, mensaje: "Usuario registrado con éxito." };
}

// Autenticar credenciales de login
export function autenticarUsuario(correo, clave) {
  const usuarios = obtenerUsuarios();
  const usuarioEncontrado = usuarios.find(
    (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.clave === clave
  );

  if (!usuarioEncontrado) {
    return { exito: false, mensaje: "Correo o contraseña incorrectos." };
  }

  return { exito: true, usuario: usuarioEncontrado };
}