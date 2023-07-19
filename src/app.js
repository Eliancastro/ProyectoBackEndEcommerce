/*import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils/dirname.js';
import config from './config/config.js';

//Passport imports

//Routers
//import viewsRouter from './routers/views.router.js';
//import usersViewRouter from './routes/users.views.router.js';
//Custom - Extended


const app = express();

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views')
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));

//Declare routers:
app.use("/",viewsRouter);
//app.use("/users", usersViewRouter);

const SERVER_PORT = config.port;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
    //console.log(process.argv);
    //Excluyendo los args por defecto:
    //console.log(process.argv.slice(2));
    //const args = process.argv.slice(2);
    //DotEnv:
    console.log(config);
    console.log("Llamando lista de numeros:");
    //listNumbers(1, 2, 3, "aaa", true);
});

const listNumbers = (...numbers) => {
    let invalidData = false;
    let dataTypes = new Array();
    console.log("Datos recibidos");
    numbers.forEach(element => {
        console.log(element);
        if (typeof(element) !== 'number') {
            invalidData = true;
        }
        dataTypes.push(typeof element);
    });
    if (invalidData){
        console.error("Invalid parameters.");
        console.log(dataTypes);
        process.exit(-4);
    }
};*/
import express from 'express';
import config from './config/config.js';
import MongoSingleton from './config/mongodb-singleton.js';
//import Routers
//Performance test:
import performanceRouter from './routers/performance-test.router.js';
import sessionRouter from './routers/sessions.router.js'
import userRouter from './routers/users.router.js';
import { addLogger } from './config/logger.js';

const app = express();

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(addLogger);


//Declare routers:
app.use("/api/performance", performanceRouter);
app.use("/api/session", sessionRouter);
app.use("/api/user", userRouter);

app.get("/logger", (req, res)=>{
    req.logger.warning("Prueba de log level warning!");
    res.send("Prueba de logger!");
});

const SERVER_PORT = config.port;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});

const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error(error);
    }
};
mongoInstance();






