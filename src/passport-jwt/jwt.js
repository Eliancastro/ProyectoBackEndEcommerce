const jwt = require('jsonwebtoken')
const JWT_PRIVATE_KEY = 'palabraJwtSecreto'

// userario sin datos sensibles
const generateToken = (user) => {
    const token = jwt.sign({user}, JWT_PRIVATE_KEY, {expiresIn: '1d'})
    return token
} 

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    // console.log(a
    if (!authHeader) {
        return res.status(401).send({status: 'error', error: 'No autenticado'}) 
    }

    // 'Bearer lkjshadfkjhasdjfkhsdhafkshafkhasdk'
    // ['Bearer', 'jfaljsfdlasjdfljaslfdjalsd']
    const token = authHeader.split(' ')[1]

    jwt.verify(token, JWT_PRIVATE_KEY, (error, credential)=>{
        if(error) return res.status(403).send({
            status: 'error', 
            error: 'No autorizado'
        })
        req.user = credential.user
        next()
    })
}

module.exports = {
    generateToken,
    authToken
}
