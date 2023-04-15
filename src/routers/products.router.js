import { Router } from "express";
import ProductManager from "../DAO/ProductManager.js";
import uploader from "../utils/multer.utils.js";

const router = Router();
const productM = new ProductManager();

router.get('/', async (req, res) => {

    const { limit } = req.query
    try {
        const valor = await productM.getProducts()
        if (valor.error) return res.status(200).send({ status: 'no hay productos', valor })
        const limite = valor.slice(0, limit)
        res.status(200).send({ status: 'Productos', limite })
    }
    catch (err) {
        res.status(400).send({ status: 'error', err })
    }

})

router.get('/:pid', async (req, res) => {
    try {
        //console.log(req.params.pid);
        const producto = await productM.getProductById(req.params.pid)
        res.status(200).send({producto})
    }
    catch (err) {
        return(err);
    }

})

router.post('/', async (req, res) => {
    try {
        
        const bod = req.body

        const vacio = Object.values(bod).find(valor => valor === '')
        console.log(vacio);
        if (vacio) {
            return res.status(400).send({ status: "error", message: "complete todos los campos" })
        }
        
        const {
            title,
            description,
            price,
            status,
            thumbnail,
            code,
            stock
        } = bod



        const value = await productM.addProduct(title, description, price, status, thumbnail, code, stock)
        //console.log(value)
        
        if (value.status === 'error') return res.status(400).send({ value })
        res.status(200).send({ bod })
    }
    catch (err) {
        return(err);
    }

});

router.post('/formulario', uploader.single('thumbnail'), async (req, res) => {
    try {
        let bod = req.body

        try {
            bod.thumbnail = req.file.path
        }
        catch {
            bod.thumbnail = 'empty'
        }
        
        (Object.hasOwn(bod,'status'))?bod['status'] = 'true':bod['status'] = 'false';
            
        let {
            title,
            description,
            price,
            status,
            category,
            thumbnail,
            code,
            stock
        } = bod


        const vacio = Object.values(bod).find(value => value === '')
        if (vacio) {
            return res.status(400).send({ status: "error", message: "complete todos los campos" })
        }

        const valor = await productM.addProduct(title, description, price, status,category, thumbnail, code, stock)
        //console.log(valor)
        res.send(res.redirect("http://localhost:8080/static"))
    }
    catch (err) {
        console.log(err);
    }

})

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const bod = req.body

        const update = await pm.updateProduct(pid, bod)
        if (!update.error) return res.status(400).send({ update })
        res.send({ update })
    }
    catch (err) {
        return(err);
    }

});

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const delet = await productM.deleteProduct(pid)
        //console.log(delet)
        if (!delet.error) return res.status(400).send({ delet })
        res.status(200).send({ delet })
    }
    catch (err) {
        return(err);
    }

});

export default router