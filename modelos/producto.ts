import { TipoVenta } from "./venta";

export class Producto {
    public id: number;
    
    // Obtiene la información del producto
    static obtenerPorId(id: any): any {
            throw new Error("Method not implemented.");
    }

    public static obtenerTodos(productosEnMemoria: Producto[]): Producto[] {
    // Devuelve todos los productos
    return productosEnMemoria;
}
    // Atributos
    private nombre: string;
    private precio: number;
    public cantidad: number;
    private tipoVenta: TipoVenta;

    // Constructor
    constructor(nombre: string, precio: number, cantidad: number, tipoVenta: TipoVenta) {
        this.id = 0;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.tipoVenta = tipoVenta;
    }

    // Métodos
    public agregar(): void {
        // Agrega el producto al inventario
    }

    public actualizarCantidad(cantidad: number): void {
        // Actualiza la cantidad en stock del producto
    }

    public obtenerInfo(): string {
        // Obtiene la información del producto
        return `
        Nombre: ${this.nombre}
        Precio: ${this.precio}
        Cantidad: ${this.cantidad}
        Tipo de venta: ${this.tipoVenta.name}
      `;
    }
}