import express from "express";
import cors from "cors";
import { Producto } from "./modelos/producto";
import { VentaUnitaria } from "./modelos/venta";

// Configuración del servidor
const app = express();
app.use(express.json());
app.use(cors());


var productosEnMemoria: Producto[] = [];

// Rutas
app.get("/productos", (req, res) => { 
    // Devuelve todos los productos
    const productos = Producto.obtenerTodos(productosEnMemoria);
    res.send(productos);
});

type ProductosEnStock = { [key: string]: number };

const productosEnStock: ProductosEnStock = {};

app.post("/productos", (req, res) => {
    // Agrega un nuevo producto
    const { nombre, precio, cantidad } = req.body;

    if (!nombre || !precio || !cantidad){
        res.status(400).json({ error: "Datos incompletos" });
        return;  
    }

    const producto = new Producto(nombre, precio, cantidad, new VentaUnitaria());
    producto.agregar();

    productosEnMemoria.push(producto);

    const productoId = producto.id; // Asumiendo que la clase Producto tiene una propiedad 'id'

    productosEnStock[productoId] = cantidad; // Registrar la cantidad en stock

    console.log(producto)
    res.json(producto);
});

app.post("/comprar/:id", (req, res) => {
    const productoId = req.params.id;
    const cantidadComprada = 1; // Puedes ajustar la cantidad según tus necesidades

    const producto = Producto.obtenerPorId(productoId);

    if (!producto) {
        res.status(404).send("Producto no encontrado");
        return;
    }

    // Verificar si hay suficiente stock para la compra
    if (producto.cantidad >= cantidadComprada) {
        producto.cantidad -= cantidadComprada; // Reducir el stock
        res.send(producto);
    } else {
        res.status(400).send("Stock insuficiente");
    }
});


app.put("/productos/:id", (req, res) => {
    // Actualiza la información de un producto
    const productoId = req.params.id;
    const { nombre, precio, cantidad } = req.body;

    const producto = Producto.obtenerPorId(productoId);
    
    if (!producto) {
        res.status(404).send("Producto no encontrado");
        return;
    }

    producto.nombre = req.body.nombre;
    producto.precio = req.body.precio;
    producto.cantidad = req.body.cantidad;
    producto.actualizarCantidad(cantidad);
    productosEnStock[productoId] = cantidad;
    res.json(producto);
});

app.delete("/productos/:id", (req, res) => {
    // Elimina un producto
    const productoId = req.params.id;

    if (!productosEnStock[productoId]) {
        res.status(404).send("Producto no encontrado");
        return;
    }

    // Disminuir el stock cuando se elimina o marca como vendido
    productosEnStock[productoId] -= 1;

    if (productosEnStock[productoId] === 0) {
        delete productosEnStock[productoId];
    }

    // Realiza la eliminación o marca como vendido 
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