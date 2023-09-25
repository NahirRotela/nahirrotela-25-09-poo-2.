import express from "express";
import cors from "cors";
import { Producto } from "./modelos/producto";
import { VentaUnitaria } from "./modelos/venta";

// Configuración del servidor
const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.get("/productos", (req, res) => { 
    // Devuelve todos los productos
    res.send(Producto.obtenerTodos());
});

app.post("/productos", (req, res) => {
    // Agrega un nuevo producto
    const producto = new Producto(
        req.body.nombre,
        req.body.precio,
        req.body.cantidad,
        new VentaUnitaria()
    );
    producto.agregar();
    console.log(producto)
    res.send(producto);
});

app.put("/productos/:id", (req, res) => {
    // Actualiza la información de un producto
    const producto = Producto.obtenerPorId(req.params.id);
    
    if (!producto) {
        res.status(404).send("Producto no encontrado");
        return;
    }

    producto.nombre = req.body.nombre;
    producto.precio = req.body.precio;
    producto.cantidad = req.body.cantidad;
    producto.actualizarCantidad(req.body.cantidad);
    res.send(producto);
});

app.delete("/productos/:id", (req, res) => {
    // Elimina un producto
    const producto = Producto.obtenerPorId(req.params.id);
    if (!producto) {
        res.status(404).send("Producto no encontrado");
        return;
    }

    producto.eliminar();
    res.send();
});

// Inicia el servidor
app.listen(3000, () => console.log("Servidor iniciado en http://localhost:3000"));