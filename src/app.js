import express from 'express';
//import ProductManager from '../src/DAO/ProductManager.js';
import productRouter from './routers/products.router.js';
import routerCar from './routers/carts.router.js';

/*const puerto = 8080
const app = express()
const product = new ProductManager("./archivo.Json")


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.status(200).send('<h1>Bienvenido</h1>')
})

app.get("/productos", async (req, res)=>{
    try {
        const { limit } = req.query
        const products = await product.getProductos()       
        if(!limit) {
            return res.send({
                status: 'success',
                products
            })            
        }
        return res.send({
            status: 'success',
            products: products.slice(0, limit)
        })   
    }catch (error){
        console.log(error)
    }
})

app.get("/productos/:pid", async (req, res)=>{
    try {
        const {pid}= req.params
        // validar si es número
        const productDb = await product.getProductById(parseInt(pid))
        // validar que exista el producto
        if (!productDb) {
            return res.send({status: 'error', error: 'product not found'})
        }
        res.send({productDb})
    }catch (error){
        console.log(error)
    }
})



app.listen(puerto, ()=>{
    console.log(`Listen on port ... ${puerto}`)
})*/

const app = express()

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/static',express.static('./src/public'));

// Router de carritos
app.use('/api/carts', routerCar)

// Router de productos
app.use('/api/products', productRouter)


app.listen(8080, () => {
    console.log('Escuchando puerto 8080');
});