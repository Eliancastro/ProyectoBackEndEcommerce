const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const objectConfig = require('./config/objetConfig.js')
const appRouter = require('./routers')

// ______________________________________________________


const FileStore  = require('session-file-store')
const {create} = require('connect-mongo') 

// hbs __________________________________________________________________
const handlebars = require('express-handlebars')
const { connect } = require('mongoose')

// passport 
const { initPassport } = require('./config/passport.config.js')
const passport = require('passport')
//__________________________________________________________________________
const { Server } = require('socket.io')

const app = express()
const PORT = 8080 //|| process.env.PORT

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})

const io = new Server(httpServer)

objectConfig.connectDB()



app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
// hbs __________________________________________


app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
// console.log(__dirname+'/public')
app.use('/static', express.static(__dirname+'/public'))
app.use(cookieParser('P@l@braS3cr3t0'))


// mid de tercero 1
// app.use(session({
    //     secret: 'secretCoder',
    //     resave: true,
    //     saveUninitialized: true
    // }))    
    
// const fileStore = FileStore(session)

// app.use(session({
//         store: new fileStore({
//             ttl: 10,
//             path: './session',
//             retries: 0
//         }),

//         secret: 'secretCoder',
//         resave: true,
//         saveUninitialized: true
// })) 

// mongo
app.use(session({
        store: create({
            mongoUrl: 'mongodb://localhost:27017',
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            ttl: 1000000*6000
        }),
        secret: 'secretCoder',
        resave: false,
        saveUninitialized: false
})) 

initPassport()
passport.use(passport.initialize())
passport.use(passport.session())

app.use(appRouter)

let messages = []

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')
    socket.on('message', data => {
        // console.log(data)
        messages.push(data)
        io.emit('messageLogs', messages)
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })

})

app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})







