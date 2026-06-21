import { personajes } from "../data/personajes.js";


// funcion para obtener todos los personajes en formato json
export const obtenerTodosLosPersonajes = (req, res) => {
    
    res.json(personajes);

};


//funcion para obtener un personaje por id
export const obtenerUnPersonajePorId = (req, res) => {

    //Esto se supone que te da el numero que el cliente pone en la url
    //por ejemplo si pone /characters/1 entonces req.params.id sera 1, y lo convertira a numero
    const idPersonaje = Number(req.params.id);

    //esto va a ser igual a una constante que tendra el valor de el metodo find que se usa en esta funcion
    //para retornar a algun personaje que tenga el id igual al de el idPersonaje
    const personajeEncontrado = personajes.find((personaje) => {
        return personaje.id === idPersonaje;
    });

    
    //lo que va a pasar aca es que si la variable personajeEncontrado no encuentra a ningun personaje con el id que pusimos entonces devolvera undefined, y entonces como undefined
    // es falso entonces al yo negar un valor de !falso me da verdadero entonces cuando no encuentre entrada a esta condiconal y me devolvera ese este error 
    if (!personajeEncontrado) {
        return res.status(404).json({
            message: `Personaje con el id #${idPersonaje} no ha sido encontrado`,
        });
    }

    // y bueno aca es lo que devuelve la funcion obtener un personaje por id, que me devolvera el personaje de el array personajes que lo buscamos mediante el metodo .find en personajeEncontrado
    return res.json({
        message: "Personaje encontrado",
        personajeEncontrado,
    });



};


