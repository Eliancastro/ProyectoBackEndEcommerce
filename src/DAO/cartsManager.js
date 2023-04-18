import fs from 'fs';

class CartManager {
    constructor() {
        this.carts = [];
        this.path = './src/DAO/carts.json';
    }

    addCart = async (newCart) => {
        try {

            const carts = await this.getCarts();
            
            this.carts = carts

            if (this.carts.length === 0) {
                newCart.id = 1
            } else {
                newCart.id = this.carts[this.carts.length - 1].id + 1
            }

            if (Object.values(newCart).every(value => value)) {
                this.carts.push(newCart);
                const cartJSON = JSON.stringify(this.carts, null, 2);
                await fs.promises.writeFile(this.path, cartJSON)
            }

            return [];
        }
        catch (err) {
            return(err);
        }

    }

    getCarts = async () => {
        try {
            const fileCarts = await fs.promises.readFile(this.path, 'utf-8')
            if (fileCarts.length === 0) return [];
            return JSON.parse(fileCarts)
        } catch (err) {
            //console.log(err);
            return { status: "Error", error: err }
        }
    };

    getCartById = async (id) => {
        try {
            const fileCarts = await fs.promises.readFile(this.path, 'utf-8')
            const parsCarts = JSON.parse(fileCarts);
            
            if (!parsCarts[id - 1]) return { error: 'Carrito inexistente' }

            return parsCarts[id - 1]
        }
        catch (err) {
            return(err);
        }
    }

    updateCart = async (id, data) => {
        try {
            const fileCarts = await fs.promises.readFile(this.path, 'utf-8')
            const parsCarts = JSON.parse(fileCarts);
            
            if (isNaN(Number(id))) return { status: "error", message: 'id no válido' };

            const findId = parsCarts.findIndex(product => product.id == id)
            if (findId === -1) return { status: "error", message: 'id no encontrado' };

            this.carts = parsCarts.map(element => {
                if(element.id == id){
                    element = Object.assign(element, data);
                    console.log(element, 'updated');
                    return element
                   
                }
                return element
            })
            
            const cartJSON = JSON.stringify(this.carts, null, 2);
            await fs.promises.writeFile(this.path, cartJSON)
            return this.carts
        }
        catch (err) {
            console.log(err);
            return(err);
        }

    }
}

export default CartManager