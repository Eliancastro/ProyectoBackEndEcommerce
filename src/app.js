import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routers/users.router.js';
import petsRouter from './routers/pets.router.js';
import adoptionsRouter from './routers/adoption.router.js';
import sessionsRouter from './routers/sessions.router.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';

const app = express();
const PORT = process.env.PORT||9090;
const connection = mongoose.connect(`mongodb://localhost:27017/clase39-adoptme?retryWrites=true&w=majority`)

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion API Adoptme",
            description: "Documentacion para uso de swagger"
        }
    },
    apis: [`./src/docs/**/*.yaml`]
};
const specs = swaggerJSDoc(swaggerOptions);
//Declare swagger api endpoint 
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});





