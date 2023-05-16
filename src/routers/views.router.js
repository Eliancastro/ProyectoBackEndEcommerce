import { Router } from "express";

const usersRouter = Router();

usersRouter.get('/chat', (req, res)=>{
    res.render('chat', {})
})


usersRouter.get('/', (req, res)=>{

    let user = users[Math.floor( Math.random() * users.length )]

    let testUser = {
        title: 'Mercadito Fede',
        user,
        isAdmin: user.role === 'admin',
        food,
        style: 'index.css'
    }

    res.render('index', testUser)
})

usersRouter.get('/register', (req, res) => {
    res.render('registerForm', {
        style: 'index.css'
    })
})

usersRouter.post('/register', (req, res) => {
    // const {name, email, password} = req.body
    const user = req.body
    res.send({
        user,
        mensaje: 'Regístro con éxito'
    })
})

module.exports = usersRouter

//quede en clase 12 chat, public.
