//const {connect} = require('mongoose')

//let url = 'mongodb+srv://eliancastro98:<password>@clusterelian.pcvqfza.mongodb.net/?retryWrites=true&w=majority'

//module.export = {
//    connectDB
//}

const {connect} = require('mongoose')
//const { orderModel } = require('../models/order.model')
//const { ordenes } = require('./ordenes')

// let url = 'mongodb+srv://federico:federico1@cluster0.tzkuy8w.mongodb.net/comsion39750?retryWrites=true&w=majority'
let url = 'mongodb://localhost:27017'

module.exports = {
    connectDB: async () => {
        try {
            connect(url)
            console.log('Base de datos conectadas')  

            // inserertar ordenes
            // await orderModel.insertMany(ordenes)

            // solicitar órdenes
            // let result = await orderModel.find()
            
            // // ejemplo de stages - 1
            // const resultOrders = await orderModel.aggregate([
            //     // stages (pasos)
            //     {
            //         // paso 1
            //         $match: {size: 'medium'}
            //     },
            //     {
            //         // paso 2
            //         $group: {_id: '$name', totalQuantity: {$sum: "$quantity"}, totalPrice: {$sum: "$price"}}
            //     }
            // ])

            // reporte/:size
            // reporte?size
            // app.get('/reporte', (req,res)=>{
            //     const {size} = req.query
            // })
            // let sizePizza = 'medium'
            // const resultOrders = await orderModel.aggregate([
            //     // stages (pasos)
            //     {
            //         // paso 1
            //         $match: {size: sizePizza}
            //     },
            //     {
            //         // paso 2
            //         $group: {_id: '$name', totalQuantity: {$sum: "$quantity"}}
            //     }, 
            //     {
            //         $sort: {totalQuantity: -1}
            //     },
            //     {
            //         $group: {_id: 1, orders: {$push: '$$ROOT'}} 
            //     }, 
            //     {
            //         $project: {
            //             "_id": 0,
            //             orders: '$orders'
            //         }
            //     },
            //     {
            //         $merge: {
            //             into: 'reportes'
            //         }
            //     }
            // ])
            // console.log(resultOrders)

            // // ejemplo de stages - 2
            
            
        } catch (err) {
            console.log(err)
        } 
    }
}


// console.log(cart.products[1]._id.toString())
