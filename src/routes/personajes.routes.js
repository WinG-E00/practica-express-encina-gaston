import { Router } from 'express';

import { crearUnPersonaje, obtenerTodosLosPersonajes,obtenerUnPersonajePorId, actualizarUnPersonaje, eliminarUnPersonaje } from '../controllers/personajes.controllers.js';



export const personajesRouter = Router();

//end point para obtener todos los personajes
personajesRouter.get("/characters", obtenerTodosLosPersonajes);

//end poiint para objetener solo un personaje por id
personajesRouter.get("/characters/:id", obtenerUnPersonajePorId );


//end point para post un personaje
personajesRouter.post("/characters", crearUnPersonaje );

// endpoint para put un personaje
personajesRouter.put("/characters/:id", actualizarUnPersonaje);


// end point para eliminar un personaje por id
personajesRouter.delete("/characters/:id", eliminarUnPersonaje);




