import { Router } from "express";
import CartManager from "../DAO/cartsManager.js";

const routerCar = Router();
const carts = new CartManager


routerCar.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const valor = await carts.getCartById(cid)
        if (valor.error) return res.status(200).send({ status: 'No hay carritos', valor })

        res.status(200).send({ status: 'Carrito', valor })
    }
    catch (err) {
        res.status(400).send({ status: 'Error', err })
    }

});

routerCar.post('/', async (req, res) => {
    try {
        
        const carts = req.body
        //console.log(carts)
        
        const vacio = Object.values(carts).find(valor => valor === '')
        //console.log(vacio);
        if (vacio) {
            return res.status(400).send({ status: "error", message: "Complete todos los campos" })
        }

        if (carts.status === 'error') return res.status(400).send({ valueReturned })
        await carts.addCart(carts)
        res.status(200).send({ carts })
    }
    catch (err) {
        return(err);
    }

});

routerCar.post('/:cid/product/:pid', async (req, res) => {
    try {   
        let { producto } = req.body
        const { cid, pid } = req.params

        producto['idProduct'] = Number(pid)

        const carrito = await carts.getCartById(cid)
        if (carrito.error) return res.status(400).send({ carrito })

        let encontrado = carrito.productos.findIndex(productos => productos.idProduct == pid)
     
        if (encontrado !== -1) {
            
            carrito.productos[encontrado].cantidad = Number(carrito.productos[encontrado].cantidad) + Number(producto.cantidad)
            //console.log(carrito.productos);
            await carts.updateCart(cid, carrito)
            return res.status(200).send({ statusbar: 'success', message: 'agregado'});
        }
        //console.log(producto);
        carrito.productos.push(producto)
        //console.log(carrito.productos);
        await carts.updateCart(cid, carrito)
        res.status(200).send({status: 'success', message: 'agregado', carrito: carrito.productos})
    } catch (err) {
        return res.status(400).send({ status: "Error", message: 'Error en los argumentos' })
    }

})

export default routerCar