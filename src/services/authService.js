const AUTH_URL = import.meta.env.VITE_AUTH_API_URL;

export async function loginApi(credenciales) {
  const response = await fetch(`${AUTH_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credenciales),
  });
  if (!response.ok) {
    throw new Error("Correo o contraseña incorrectos");
  }
  return response.json();
}

export async function registrarClienteApi(datos) {
  const response = await fetch(`${AUTH_URL}/auth/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.mensaje || "No se pudo completar el registro");
  }
  return response.json();
}