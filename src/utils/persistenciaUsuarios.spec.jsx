import { describe, it, expect, beforeEach } from "vitest";
import {
  obtenerUsuarios,
  registrarUsuario,
  autenticarUsuario,
} from "./persistenciaUsuarios";

describe("Pruebas Unitarias - Persistencia de Usuarios (100% Cobertura)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("obtenerUsuarios", () => {
    it("debe inicializar el localStorage con el usuario Admin por defecto si está vacío", () => {
      const usuarios = obtenerUsuarios();
      
      expect(usuarios.length).toBeGreaterThan(0);
      expect(usuarios[0].correo).toBe("admin@ferreteria.cl");
      expect(usuarios[0].rol).toBe("admin");
      expect(localStorage.getItem("usuarios_ferreteria_v1")).not.toBeNull();
    });

    it("debe retornar la lista de usuarios guardada previamente en localStorage", () => {
      const listaCustom = [
        { nombre: "Juan", correo: "juan@duoc.cl", clave: "123456", rol: "cliente" },
      ];
      localStorage.setItem("usuarios_ferreteria_v1", JSON.stringify(listaCustom));

      const usuarios = obtenerUsuarios();
      expect(usuarios).toHaveLength(1);
      expect(usuarios[0].correo).toBe("juan@duoc.cl");
    });

    it("debe retornar el usuario Admin inicial si el JSON guardado en localStorage es inválido", () => {
      localStorage.setItem("usuarios_ferreteria_v1", "JSON_CORRUPTO_{");

      const usuarios = obtenerUsuarios();
      expect(usuarios.length).toBeGreaterThan(0);
      expect(usuarios[0].correo).toBe("admin@ferreteria.cl");
    });
  });

  describe("registrarUsuario", () => {
    it("debe registrar con éxito a un nuevo usuario si el correo no está registrado", () => {
      const nuevoUsuario = {
        nombre: "Pedro Pascal",
        correo: "pedro@duoc.cl",
        clave: "pascal123",
        rol: "cliente",
      };

      const respuesta = registrarUsuario(nuevoUsuario);

      expect(respuesta.exito).toBe(true);
      expect(respuesta.mensaje).toBe("Usuario registrado con éxito.");

      const usuariosEnStorage = JSON.parse(localStorage.getItem("usuarios_ferreteria_v1"));
      const registrado = usuariosEnStorage.find((u) => u.correo === "pedro@duoc.cl");
      expect(registrado).toBeDefined();
      expect(registrado.nombre).toBe("Pedro Pascal");
    });

    it("debe rechazar el registro si el correo ya existe en la base de datos (case-insensitive)", () => {
      const usuarioOriginal = {
        nombre: "María Lopez",
        correo: "maria@duoc.cl",
        clave: "clave123",
      };
      registrarUsuario(usuarioOriginal);

      const usuarioDuplicado = {
        nombre: "María Variante",
        correo: "MARIA@DUOC.CL",
        clave: "otraClave456",
      };

      const respuesta = registrarUsuario(usuarioDuplicado);

      expect(respuesta.exito).toBe(false);
      expect(respuesta.mensaje).toBe("El correo electrónico ya se encuentra registrado.");
    });
  });

  describe("autenticarUsuario", () => {
    it("debe autenticar con éxito al usuario Administrador predeterminado", () => {
      const respuesta = autenticarUsuario("admin@ferreteria.cl", "admin123");

      expect(respuesta.exito).toBe(true);
      expect(respuesta.usuario).toBeDefined();
      expect(respuesta.usuario.correo).toBe("admin@ferreteria.cl");
      expect(respuesta.usuario.rol).toBe("admin");
    });

    it("debe autenticar sin importar el uso de mayúsculas/minúsculas en el correo", () => {
      const respuesta = autenticarUsuario("ADMIN@FERRETERIA.CL", "admin123");

      expect(respuesta.exito).toBe(true);
      expect(respuesta.usuario.correo).toBe("admin@ferreteria.cl");
    });

    it("debe rechazar el login si la contraseña es incorrecta", () => {
      const respuesta = autenticarUsuario("admin@ferreteria.cl", "clave_erronea");

      expect(respuesta.exito).toBe(false);
      expect(respuesta.mensaje).toBe("Correo o contraseña incorrectos.");
      expect(respuesta.usuario).toBeUndefined();
    });

    it("debe rechazar el login si el correo no existe en el sistema", () => {
      const respuesta = autenticarUsuario("no_existo@duoc.cl", "admin123");

      expect(respuesta.exito).toBe(false);
      expect(respuesta.mensaje).toBe("Correo o contraseña incorrectos.");
    });
  });
});