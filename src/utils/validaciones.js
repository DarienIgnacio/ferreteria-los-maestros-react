// Lista de dominios permitidos
export const DOMINIOS_PERMITIDOS = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "duoc.cl",
  "duocuc.cl",
  "profesor.duoc.cl"
];

// 1. Validar Nombre: solo letras, tildes, espacios y entre 3 y 80 caracteres
export function validarNombre(nombre) {
  if (!nombre || !nombre.trim()) {
    return "El nombre completo es obligatorio";
  }
  const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,80}$/;
  if (!regexNombre.test(nombre.trim())) {
    return "El nombre solo debe contener letras y tener entre 3 y 80 caracteres";
  }
  return "";
}

// 2. Validar Correo: estructura básica + lista de dominios autorizados
export function validarCorreo(correo) {
  if (!correo || !correo.trim()) {
    return "El correo electrónico es obligatorio";
  }
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(correo.trim())) {
    return "Ingrese un correo electrónico con formato válido";
  }
  
  const dominio = correo.trim().split("@")[1]?.toLowerCase();
  if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    return `Dominio no permitido. Use: ${DOMINIOS_PERMITIDOS.join(", ")}`;
  }
  return "";
}

// 3. Validar RUN: formato 12345678-K o 12345678-9 (sin puntos, con guion)
export function validarRun(run) {
  if (!run || !run.trim()) {
    return "El RUN es obligatorio";
  }
  const regexRun = /^[0-9]{7,8}-[0-9kK]{1}$/;
  if (!regexRun.test(run.trim())) {
    return "Formato de RUN inválido (Ejemplo: 12345678-K sin puntos y con guion)";
  }
  return "";
}

// 4. Validar Contraseña: mínimo 6 caracteres
export function validarClave(clave) {
  if (!clave) {
    return "La contraseña es obligatoria";
  }
  if (clave.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres";
  }
  return "";
}

// 5. Validar Confirmación de Contraseña
export function validarConfirmacionClave(clave, confirmarClave) {
  if (!confirmarClave) {
    return "Debe confirmar su contraseña";
  }
  if (clave !== confirmarClave) {
    return "Las contraseñas no coinciden";
  }
  return "";
}