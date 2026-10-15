import { describe, it, expect, beforeEach } from "vitest";
import {
  obtenerCarritoGuardado,
  guardarCarrito,
  calcularTotalesCarrito,
} from "./persistenciaCarrito";

describe("Pruebas Unitarias - Persistencia del Carrito (100% Cobertura)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("obtenerCarritoGuardado", () => {
    it("debe retornar un arreglo vacío [] si no hay nada en localStorage", () => {
      const carrito = obtenerCarritoGuardado();
      expect(carrito).toEqual([]);
    });

    it("debe retornar los elementos del carrito guardados en localStorage", () => {
      const carritoMock = [
        { codigo: "PROD-1", nombre: "Martillo", precio: 5000, cantidad: 2 },
      ];
      localStorage.setItem("ferreteria_los_maestros_carrito", JSON.stringify(carritoMock));

      const carrito = obtenerCarritoGuardado();
      expect(carrito).toHaveLength(1);
      expect(carrito[0].codigo).toBe("PROD-1");
    });
  });

  describe("guardarCarrito", () => {
    it("debe serializar y guardar correctamente el carrito en localStorage", () => {
      const carritoMock = [
        { codigo: "PROD-2", nombre: "Alicate", precio: 3000, cantidad: 1 },
      ];
      
      guardarCarrito(carritoMock);

      const guardado = JSON.parse(localStorage.getItem("ferreteria_los_maestros_carrito"));
      expect(guardado).toEqual(carritoMock);
    });
  });

  describe("calcularTotalesCarrito", () => {
    it("debe retornar cero en total, neto e iva cuando el carrito está vacío", () => {
      const totales = calcularTotalesCarrito([]);
      expect(totales).toEqual({ total: 0, neto: 0, iva: 0 });
    });

    it("debe calcular correctamente el total, neto e IVA de los productos en el carrito", () => {
      const carritoMock = [
        { precio: 10000, cantidad: 1 }, // Subtotal: 10000
        { precio: 1900, cantidad: 1 },  // Subtotal: 1900 -> Total: 11900
      ];

      const { total, neto, iva } = calcularTotalesCarrito(carritoMock);

      expect(total).toBe(11900);
      expect(neto).toBe(10000); // 11900 / 1.19 = 10000
      expect(iva).toBe(1900);    // 11900 - 10000 = 1900
    });

    it("debe redondear el valor neto adecuadamente cuando hay decimales", () => {
      const carritoMock = [
        { precio: 1000, cantidad: 1 }, // Total: 1000 -> Neto: Math.round(1000 / 1.19) = 840
      ];

      const { total, neto, iva } = calcularTotalesCarrito(carritoMock);

      expect(total).toBe(1000);
      expect(neto).toBe(840);
      expect(iva).toBe(160); // 1000 - 840 = 160
    });
  });
});