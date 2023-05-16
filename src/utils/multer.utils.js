/*import multer from 'multer';
const pathUrl = new URL('../', import.meta.url)

const path = pathUrl.pathUrl.slice(1, pathUrl.pathUrl.length)+'public/img'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        
        cb(null, path)
    },
    filename: function(req, file, cb){
       
        cb(null, file.originalname)
    }
})

const uploader = multer({
    storage,
    onError: function(err, next){
        console.log(err)    
        next()
    }
})

export default uploader*/

const multer = require('multer')
const {dirname} = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, `${dirname(__dirname)}/public/uploads`)
    },
    filename: (req, file, callback)=>{
        callback(null, `${Date.now()}-${file.originalname}`)
    }
}) // nombre del archivo - ubicación

const uploader = multer({
    storage,
    onError: (err,next)=>{
        console.log(err)
        next(err)
    }
})

module.exports={
    uploader
}
