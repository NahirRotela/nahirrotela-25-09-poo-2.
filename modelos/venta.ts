export interface TipoVenta {
    name: any;
    calcularPrecio(cantidad: number): number;
}

export class VentaUnitaria implements TipoVenta {
    name: any;
    precio: number;

    // Constructor
    constructor() {
        this.precio = 0;
    }

    public calcularPrecio(cantidad: number): number {
        return cantidad * this.precio;
    } }