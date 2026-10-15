import { describe, it, expect, beforeEach } from "vitest";
import {
  obtenerProductos,
  guardarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "./persistenciaProductos";
import { productosIniciales } from "../data/productos";

describe("Pruebas Unitarias - Persistencia de Productos (100% Cobertura)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("obtenerProductos", () => {
    it("debe inicializar el localStorage con productosIniciales si no existen datos", () => {
      const productos = obtenerProductos();
      expect(productos).toEqual(productosIniciales);
      expect(localStorage.getItem("productos_ferreteria_v2")).not.toBeNull();
    });

    it("debe retornar los productos guardados previamente en localStorage", () => {
      const productosMock = [
        { codigo: "TEST-001", nombre: "Taladro de Prueba", precio: 10000, stock: 5 },
      ];
      localStorage.setItem("productos_ferreteria_v2", JSON.stringify(productosMock));

      const productos = obtenerProductos();
      expect(productos).toHaveLength(1);
      expect(productos[0].codigo).toBe("TEST-001");
    });

    it("debe retornar productosIniciales si el JSON en localStorage es inválido (error de parseo)", () => {
      localStorage.setItem("productos_ferreteria_v2", "JSON_INVALIDO_{");
      const productos = obtenerProductos();
      expect(productos).toEqual(productosIniciales);
    });
  });

  describe("guardarProductos", () => {
    it("debe guardar un arreglo de productos correctamente en localStorage", () => {
      const productosMock = [{ codigo: "HERR-100", nombre: "Alicate", precio: 5000 }];
      guardarProductos(productosMock);

      const guardados = JSON.parse(localStorage.getItem("productos_ferreteria_v2"));
      expect(guardados).toEqual(productosMock);
    });
  });

  describe("crearProducto", () => {
    it("debe agregar un nuevo producto al inventario y actualizar el localStorage", () => {
      const nuevoProducto = {
        codigo: "NUEVO-001",
        nombre: "Lija Madera 80",
        categoria: "Insumos",
        precio: 500,
        stock: 50,
      };

      const listaActualizada = crearProducto(nuevoProducto);

      expect(listaActualizada).toHaveLength(productosIniciales.length + 1);
      expect(listaActualizada).toContainEqual(nuevoProducto);

      // Verificación en localStorage
      const guardados = JSON.parse(localStorage.getItem("productos_ferreteria_v2"));
      expect(guardados).toContainEqual(nuevoProducto);
    });
  });

  describe("actualizarProducto", () => {
    it("debe modificar los datos de un producto existente dado su código", () => {
      const codigoAEditar = productosIniciales[0].codigo;
      const datosNuevos = { precio: 99999, stock: 100 };

      const listaActualizada = actualizarProducto(codigoAEditar, datosNuevos);

      const productoModificado = listaActualizada.find((p) => p.codigo === codigoAEditar);
      expect(productoModificado.precio).toBe(99999);
      expect(productoModificado.stock).toBe(100);
      expect(productoModificado.nombre).toBe(productosIniciales[0].nombre);
    });

    it("debe mantener la lista intacta si el código a actualizar no existe", () => {
      const listaOriginal = obtenerProductos();
      const listaActualizada = actualizarProducto("CODIGO-INEXISTENTE", { precio: 100 });

      expect(listaActualizada).toEqual(listaOriginal);
    });
  });

  describe("eliminarProducto", () => {
    it("debe remover un producto de la lista según su código", () => {
      const codigoAEliminar = productosIniciales[0].codigo;

      const listaActualizada = eliminarProducto(codigoAEliminar);

      expect(listaActualizada).toHaveLength(productosIniciales.length - 1);
      const existe = listaActualizada.some((p) => p.codigo === codigoAEliminar);
      expect(existe).toBe(false);
    });

    it("no debe alterar la lista si se intenta eliminar un código inexistente", () => {
      const listaOriginal = obtenerProductos();
      const listaActualizada = eliminarProducto("CODIGO-INEXISTENTE");

      expect(listaActualizada).toHaveLength(listaOriginal.length);
    });
  });
});