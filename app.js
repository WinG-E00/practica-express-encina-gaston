import {personajes} from './src/data/personajes.js';
import express from 'express';

import { personajesRouter } from './src/routes/personajes.routes.js'

//Primero creo mi objeto app
const app = express();

app.use(express.json());


app.use('/api', personajesRouter);





app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000')
});

