/*import express from 'express';
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

/*const app = express()


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
});*/

import express from 'express';
import productRouter from '../src/routers/products.router.js';
import routerCar from './routers/carts.router.js';
import handlebars from 'express-handlebars'
import __dirname from './utils/dirname.js';
// import usersRouter from '../src/routers/views.router.js';
import ProductManager from './DAO/ProductManager.js';
//__________________________________________________________________________________

const pm = new ProductManager();

import {Server} from 'socket.io';
const app = express()

const httpServer = app.listen(8080, () => {
    // console.log(__dirname)
    console.log('Estoy escuchando el puerto 8080');
});

const socketServer = new Server(httpServer)

app.use('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts.js', {})
})

socketServer.on('connection', async socket => {
    console.log('Client connection');
    const data =  await pm.getProducts()
    // console.log(data);
    socket.emit('products', {data, style: 'index.css'})

    socket.on('product', async data => {
        
        try{
            const {
            title,
            description,
            price,
            status,
            category,
            thumbnail,
            code,
            stock
        } = data
        console.log(data, 'evaluando stock');

        const valueReturned = await pm.addProduct(title, description, price, status,category, thumbnail, code, stock)
        console.log(valueReturned)
        }
        catch (err){
            console.log(err);
        }
        
        // console.log(data)
})
})


//__________________________________________________________________________________





// hbs --------------------------------------------------

app.engine('handlebars', handlebars.engine()) // Con esto iniciamos nuestro motor de plantillas
app.set('views', __dirname+'./views') // Con esto decimos donde buscar las plantillas
app.set('view engine', 'handlebars') 
// Con esto cerramos la configuración
// hbs --------------------------------------------------

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/static',express.static('./public'));
// ---------------------------------------------------------




// Router de carritos
app.use('/api/carts', routerCar)

// Router de productos
app.use('/api/products', productRouter)
app.use('/', productRouter)

// app.use('/', usersRouter)
