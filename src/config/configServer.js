const {connect} = require('mongoose')

module.exports = {
    connectDb: ()=>{
        connect('mongodb://localhost:27017/miPrimeraBase')
        console.log('Base de datos conectada')
    }
}
