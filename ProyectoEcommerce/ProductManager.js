//import * as fs from 'fs';
import Producto from './Producto.js';

class ProductManager{
    constructor(){
        
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

        
    }

}

export default ProductManager;

let app = new ProductManager()
app.agregarProducto("hola", "holaaa", 10, "ni", 9, 25);
app.agregarProducto("ho", "hol", 11, "niS", 10, 26);
app.agregarProducto("hol", "hola", 12, "niSE", 11, 27);
app.agregarProducto("holaA", "holaaaA", 13, "niSES", 12, 28);
console.log(app.getProductById(4));
//console.log(app.getProductos());
//console.log(app.getProductos());
//app.updateProduct(1, {titulo: "apaaa"});
//console.log(app.getProductos());
//app.daleteProduct(1);
//console.log(app.getProductById(2));