const {connect} = require('mongoose')

module.exports = {
    connectDb: ()=>{
        connect('mongodb://localhost:27017/comision39750')
        console.log('Base de datos conectada')
    }
}
