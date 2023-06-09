const { Schema, model } = require('mongoose')

const collection = 'carritos'

const cartSchema = new Schema({
    status: String,
    // email: String,
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        // quantity: Number
    }]
})

cartSchema.pre('findOne', function(){
    this.populate('products.product')
})

const cartModel = model(collection, cartSchema)

module.exports = {
    cartModel
}

