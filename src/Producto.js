class Producto{

    constructor(id, titulo, descripcion, precio, img, code, stock){
        
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.img = img;
        this.code = code;
        this.stock = stock;
    }

    static incrementarId  () {
         Producto.id++
    }

}


export default Producto;