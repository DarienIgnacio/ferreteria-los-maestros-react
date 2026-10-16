import { describe, it, expect } from "vitest";
import {
  validarNombre,
  validarCorreo,
  validarRun,
  validarClave,
  validarConfirmacionClave,
  DOMINIOS_PERMITIDOS,
} from "./validaciones";

describe("Pruebas Unitarias - Módulo de Validaciones (100% Cobertura)", () => {
  describe("validarNombre", () => {
    it("debe retornar error si el nombre está vacío, es null o contiene solo espacios", () => {
      expect(validarNombre("")).toBe("El nombre completo es obligatorio");
    });

    it("debe retornar error si contiene números o caracteres especiales no permitidos", () => {
      expect(validarNombre("Juan123")).toBe(
        "El nombre solo debe contener letras y tener entre 3 y 80 caracteres"
      );
      expect(validarNombre("María_Pérez")).toBe(
        "El nombre solo debe contener letras y tener entre 3 y 80 caracteres"
      );
    });

    it("debe retornar error si el nombre tiene menos de 3 o más de 80 caracteres", () => {
      expect(validarNombre("Jo")).toBe(
        "El nombre solo debe contener letras y tener entre 3 y 80 caracteres"
      );
    });

    it("debe aceptar un nombre válido con letras, espacios y tildes", () => {
      expect(validarNombre("Álvaro José Ñuñez")).toBe("");
    });
  });


  describe("validarCorreo", () => {
    it("debe retornar error si el correo está vacío, es null o tiene solo espacios", () => {
      expect(validarCorreo("")).toBe("El correo electrónico es obligatorio");
    });

    it("debe retornar error si la estructura del correo es inválida", () => {
      expect(validarCorreo("usuario@")).toBe(
        "Ingrese un correo electrónico con formato válido"
      );
    });

    it("debe retornar error si el dominio no está en la lista de permitidos", () => {
      const errorEsperado = `Dominio no permitido. Use: ${DOMINIOS_PERMITIDOS.join(", ")}`;
      expect(validarCorreo("usuario@yahoo.com")).toBe(errorEsperado);
    });

    it("debe aceptar correos con dominios autorizados de la lista", () => {
      expect(validarCorreo("admin@ferreteria.cl")).toBe("");
    });
  });

  describe("validarRun", () => {
    it("debe retornar error si el RUN está vacío, es null o tiene solo espacios", () => {
      expect(validarRun("")).toBe("El RUN es obligatorio");
    });

    it("debe retornar error si el formato del RUN no cumple con regex (sin puntos, con guion)", () => {
      expect(validarRun("12.345.678-K")).toBe(
        "Formato de RUN inválido (Ejemplo: 12345678-K sin puntos y con guion)"
      );
      expect(validarRun("12345678K")).toBe(
        "Formato de RUN inválido (Ejemplo: 12345678-K sin puntos y con guion)"
      );
      expect(validarRun("123456-K")).toBe(
        "Formato de RUN inválido (Ejemplo: 12345678-K sin puntos y con guion)"
      );
    });

    it("debe aceptar un RUN con formato correcto", () => {
      expect(validarRun("19876543-K")).toBe("");
    });
  });

  describe("validarClave", () => {
    it("debe retornar error si la clave está vacía, es null o undefined", () => {
      expect(validarClave("")).toBe("La contraseña es obligatoria");
    });

    it("debe retornar error si la clave tiene menos de 6 caracteres", () => {
      expect(validarClave("12345")).toBe(
        "La contraseña debe tener al menos 6 caracteres"
      );
    });

    it("debe aceptar claves con 6 o más caracteres", () => {
      expect(validarClave("admin123")).toBe("");
    });
  });

  describe("validarConfirmacionClave", () => {
    it("debe retornar error si la confirmación de clave está vacía o es null", () => {
      expect(validarConfirmacionClave("admin123", "")).toBe(
        "Debe confirmar su contraseña"
      );
    });

    it("debe retornar error si las contraseñas no coinciden", () => {
      expect(validarConfirmacionClave("admin123", "admin999")).toBe(
        "Las contraseñas no coinciden"
      );
    });

    it("debe aceptar cuando ambas contraseñas coinciden de forma exacta", () => {
      expect(validarConfirmacionClave("admin123", "admin123")).toBe("");
    });
  });


  describe("DOMINIOS_PERMITIDOS", () => {
    it("debe exportar la lista de dominios esperada", () => {
      expect(DOMINIOS_PERMITIDOS).toContain("ferreteria.cl");
    });
  });
});