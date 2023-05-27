const {Router} = require('express')
const { auth } = require('../middlewares/autenticacion.middleware')
const { userModel } = require('../models/user.model')
const { createHash, isValidPassword } = require('../utils/bcryptHash')
const passport = require('passport')
const { generateToken } = require('../utils/jwt')
const { passportCall } = require('../passport-jwt/passportCall')
const { authorizaton } = require('../passport-jwt/authorizarionJwtRole')

const router = Router()


// router.post('/login', async (req, res)=> {
//     const {email, password} = req.body
//     // validar email y password

//     // vamos a tener una función para validar el password
//     const userDB = await userModel.findOne({email})
//     // 
//     // console.log(userDB)

//     if (!userDB) return res.send({status: 'error', message: 'No existe ese usuario, revisar'})

    
//     // validar password
//     if (!isValidPassword(password, userDB)) return res.status(401).send({
//         status: 'error',
//         message: 'El usuario o la contraseña no es la correcta'
//     })


//     req.session.user = {
//         first_name: userDB.first_name,
//         last_name: userDB.last_name,
//         email: userDB.email,
//         role: 'admin'
//     }
    
//     res.send({
//         status: 'success',
//         message: 'login success',
//         session: req.session.user
//     })
// })


// router.post('/register', async (req, res) => {
//     try {
//         const {username,first_name, last_name, email, password} = req.body 
//         //validar si vienen distintos de vacios && caracteres especiales
    
//         // validar si existe mail+
//         const existUser = await userModel.findOne({email})
    
//         if (existUser) return res.send({status: 'error', message: 'el email ya está registrado' })
    
//         // otra forma
//         // const newUser = new userModel({
//         //     username,
//         //     first_name,
//         //     last_name, 
//         //     email, 
//         //     password 
//         // })
//         // await newUser.save()
    
//         const newUser = {
//             username,
//             first_name,
//             last_name, 
//             email, 
//             password: createHash(password) /// encriptar
//         }
//         let resultUser = await userModel.create(newUser)
    
    
    
    
//         res.status(200).send({
//             status: 'success',
//             message: 'Usuario creado correctamente',
//             resultUser
//         })
//     } catch (error) {
//         console.log(error)
//     }
   
// })

// login
// router.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), async (req,res) => { 
//     if (!req.user) return res.status(401).send({status: 'error', message: 'invalid credencial'})
//     req.session.user= {
//         first_name: req.user.first_name,
//         last_name: req.user.last_name,
//         email: req.user.email
//     }
//     res.send({status: 'success', message: 'User registered'})
// })

// router.post('/register', passport.authenticate('register', {failureRedirect: '/failregister'}), async (req,res) => {    
//     res.send({status: 'success', message: 'User registered'})
// })

// router.get('/faillogin', async (req,res)=>{
//     console.log('Falló la estrategia')
//     res.send({status: 'error', error: 'falló autenticación'})
// })

// router.get('/failregister', async (req,res)=>{
//     console.log('Falló la estrategia')
//     res.send({status: 'error', error: 'falló autenticación'})
// })

// /// github
// router.get('/github', passport.authenticate('github', {scope: ['user:email']}), ()=>{})
// router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/views/login'}), async (req, res)=>{
//     req.session.user = req.user
//     res.redirect('/api/productos')
// })



router.post('/login', async (req, res)=> {
    const {email, password} = req.body
    // validar email y password

    // vamos a tener una función para validar el password
    // const {password: pass, ...userDb} = await userModel.findOne({email})
    // 
    // console.log(userDB)

    // if (!userDB) return res.send({status: 'error', message: 'No existe ese usuario, revisar'})

    
    // validar password
    // if (!isValidPassword(password, userDB)) return res.status(401).send({
    //     status: 'error',
    //     message: 'El usuario o la contraseña no es la correcta'
    // })


    // req.session.user = {
    //     first_name: userDB.first_name,
    //     last_name: userDB.last_name,
    //     email: userDB.email,
    //     role: 'admin'
    // }

    // userDb 
    const access_token = generateToken({
        first_name: 'elian',
        last_name: 'castro',
        email: 'castro@gmail.com',
        role: 'user'
    })
    
    res
    .cookie('coderCookieToken', access_token,{
        maxAge: 60*60*100,
        httpOnly: true
    })
    .send({
        status: 'success',
        message: 'login success'
    })
})
// si viene corrupto o no viene
// validar ahora es el role
router.get('/current', passportCall('jwt'), authorizaton('user'), (req, res)=>{
    res.send(req.user)
})


router.post('/register', async (req, res) => {
    try {
        const {username,first_name, last_name, email, password} = req.body 
        //validar si vienen distintos de vacios && caracteres especiales
    
        // validar si existe mail+
        // const existUser = await userModel.findOne({email})
    
        // if (existUser) return res.send({status: 'error', message: 'el email ya está registrado' })
    
        // otra forma
        // const newUser = new userModel({
        //     username,
        //     first_name,
        //     last_name, 
        //     email, 
        //     password 
        // })
        // await newUser.save()
    
        // const newUser = {
        //     username,
        //     first_name,
        //     last_name, 
        //     email, 
        //     password: createHash(password) /// encriptar
        // }
        // let resultUser = await userModel.create(newUser)
    
        let token = generateToken({
            first_name: 'elian',
            last_name: 'castro',
            email: 'castro@gmail.com'
        })
    
    
        res.status(200).send({
            status: 'success',
            message: 'Usuario creado correctamente',
            token
        })
    } catch (error) {
        console.log(error)
    }
   
})



router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if (err) {
            return res.send({status: 'error', error: err})
        }
        res.send('logout ok')
    })
})


router.post('/restaurarpass', async (req, res) => {
    const { email, password } = req.body;
  
    // Encontrar el usuario por correo electrónico
    const userDB = await userModel.findOne({ email });
  
    if (!userDB) {
      // Si el usuario no existe, redireccionar a una página de error
      return res.status(401).send({status: 'error', message: 'El usuario no existe'})
    }    
  
    //Hasear Actualizar la contraseña del usuario
    userDB.password = createHash(password)
    await userDB.save()
  
    // Redireccionar al usuario a la página de login
    res.status(200).json({status: 'success', message:'Contraseña actualizada correctamente'});
  })



// sesiones 
router.get('/counter', (req, res)=> {
    if (req.session.counter) {
        req.session.counter ++
        res.send(`se ha visitado el sitio ${req.session.counter} veces.`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido')
    }
})

router.get('/privada', auth,(req,res) => {

    res.send('Todo lo que esta acá solo lo puede ver un admin loagueado')
})

module.exports = router
