import * as fs from 'fs';
import Producto from './Producto.js';

class ProductManager{
   /* constructor(){
        
        this.productos = new Array();
    }
      

    
    getProductos = () => {
        return this.productos;
    }
    agregarProducto = (titulo, descripcion, precio, img, code, stock) => {
        if(this.productos.some((element) => (element).code === code)){
            console.log("Code repetido.");
            
        }else{
            let id;
            if(this.productos.length===0){
                id=1;
            }else{
                id = this.productos[this.productos.length-1].id +1;
            }
    
            let nuevoProducto = new Producto (id,titulo, descripcion, precio, img, code, stock);
            
            this.productos.push(nuevoProducto);

        }
            console.log("Se agrego el producto con exito.");
        
    }
    getProductById (id) {
        //let productFilter = this.productos.find((element) => element.id === id);
        //return (productFilter) || ("no se encontro el id");
        let productId
        if(productId = this.productos.find(product => product.id === id)){

            console.log("Existing product")
            return productId;
        }else{

            console.log("Product not found");
        }

        
    }*/

    constructor(pat){
        this.path = pat;
        this.productos = new Array();
        console.log("generando escritura de archivo Sync con fileName:" + this.path);
        
        /*fs.promises.mkdir(this.path, { recursive: true });
        if(!fs.existsSync(this.path)){
            fs.promises.writeFile(this.path, "[]");
        }else{
            fs.promises.writeFile(this.path, "[]");
        }
        if(fs.existsSync(this.path)){
            console.log("archivo creado con exito en la ruta:" + fs.realpathSync(this.path));
            fs.appendFileSync(this.path);
            let contenido = fs.readFileSync(this.path, "utf-8");
            console.log("actualizando contenido del archivo"),
            console.log(contenido);
            console.log("Borrando archivo...");
            fs.unlinkSync(this.path);
            fs.existsSync(this.path) ? console.log("el archivo no se pudo borrar..") : console.log("archivo borrado");
        
        }else{
            console.error("Error creando el archivo");
        
        }*/

        // let archivo = new Archivo(Array);
    }

    writeFile = async data => {
        try {
            await fs.promises.writeFile(
                this.path, JSON.stringify(data, null, 2)
                )
            }catch(err) {
            console.log(err);
            }
        }

    getProductos = async () => {
        let contenid = await fs.promises.readFile(this.path, "utf-8");
        this.productos = JSON.parse(contenid);
        console.log("leyendo contenido del archivo");
        return this.productos;
    }
    agregarProducto = (titulo, descripcion, precio, img, code, stock) => {
        if(this.productos.some((element) => (element).code === code)){
            console.log("Code repetido.");
            
        }else{

            let id;
            if(this.productos.length===0){
                id=1;
            }else{
                id = this.productos[this.productos.length-1].id +1;
            }
            let nuevoProducto = new Producto (id, titulo, descripcion, precio, img, code, stock);
            this.productos.push(nuevoProducto);
            this.writeFile(this.productos)
                
                fs.readFile(this.path, "utf-8", (error, contenido) => {
                    if(error) throw Error ("No se pudo escribir el archivo!");
                    //console.log("contenido del archivo");
                    //console.log(contenido);
                    
                })
            
            console.log("Se agrego el producto con exito.");
        }
    }
    getProductById = async (id) => {
        let productFilter = await fs.promises.readFile(this.path, "utf-8");
        console.log(productFilter);
        this.productos = JSON.parse(productFilter);
        console.log("se encontro:");
        console.log(this.productos);
        const productoId = this.productos.filter(obj => obj.id === id);
        if(productoId.length > 0){
            console.log("el producto con este ${id} es :");
            console.log(productoId);
        }else{
            console.log("Not Found");
        }
    }

    consultaDeProducto = async () =>{
        try{
            //await this.prepareDirProducts();

            let productFile = await this.fs.promises.readFile(this.path, "utf-8");

            this.productos = JSON.parse(productFile)

            return this.productos;

        } catch (error){
            console.error("Error al consultar los productos");
            throw Error(`Error al consultar los productos, detalle del error ${error}`);
        }

    }

    daleteProduct = async (id) => {
        try{
            if(this.productos.find((prod) => prod.id === id)){
                let product = await fs.promises.readFile(this.path, "utf-8");
                console.log(product);
                this.productos = JSON.parse(product);
                this.productos.splice(id-1, 1);
                console.log("se elimino el producto");
                console.log(this.productos);
                await fs.promises.writeFile(this.path, JSON.stringify(this.productos));

            }
        }catch{
            console.log("error al eliminar");
        }

    }
    updateProduct = async (id, nuevoProduct) => {
        let product = await fs.promises.readFile(this.path, "utf-8");
        console.log(product);
        this.productos = JSON.parse(product);
        this.getProductos;
        const updateProducts = this.productos.map((prod) => {
            if (prod.id === id){
                return { ...prod, ...nuevoProduct};

            }else{
                return prod;
            }
        });
        this.productos = updateProducts;
        fs.promises.writeFile(this.path, JSON.stringify(this.productos));
        console.log(this.productos);
    }
}

export default ProductManager;

let app = new ProductManager("./ProyectoEcommerce/archivo.Json")
app.agregarProducto("ho", "hol", 11, "niS", 10, 26);
app.agregarProducto("hol", "hola", 12, "niSE", 11, 27);
app.agregarProducto("hoi", "holi", 16, "niSl", 10, 29);
app.agregarProducto("hola", "holaaa", 10, "ni", 9, 25);
app.agregarProducto("holaA", "holaaaA", 13, "niSES", 12, 28);
//console.log(app.getProductById(4));
console.log(app.getProductos());
//app.updateProduct(1, {titulo: "apaaa"});
//console.log(app.getProductos());
app.daleteProduct(2);
console.log(app.getProductos());
//console.log(app.getProductById(2));