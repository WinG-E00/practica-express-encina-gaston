import { personajes } from "../data/personajes.js";




//Funcion para obtener todos los personajes
export const obtenerTodosLosPersonajes = (req, res) => {

res.json(personajes);

};