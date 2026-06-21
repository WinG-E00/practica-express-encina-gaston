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



//funcion para agregar un personaje
export const crearUnPersonaje = (req, res) => {

    const { nombre, imagen} = req.body;

    //Validacion para que ni nombre ni imagen esten vacios
    if (nombre === "") {
        return res.status(400).json({
            message:"El nombre no puede estar vacio",
        })
    }else if( imagen === "") {
        return res.status(400).json({
            message:"La imagen no puede estar vacia",
        })
    }


    const newPersonaje = {
        id: personajes.length + 1,
        nombre,
        imagen
    };


    personajes.push(newPersonaje);


    res.status(201).json({
        message: "Personaje creado correctamente",
        newPersonaje
    });


};



//Funcion para modificar un personaje
 
export const actualizarUnPersonaje = (req, res) => {

    const idPersonaje = Number(req.params.id);

    // Validar que el ID es un número válido
    if (isNaN(idPersonaje)) {
        return res.status(400).json({ message: "El ID debe ser un número válido" });
    }

    // Validar que el body no esté vacío
    const updates = req.body || {};
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "El body no puede estar vacío; debe contener al menos un campo" });
    }

    // No permitir actualizar el id directamente
    if (Object.prototype.hasOwnProperty.call(updates, 'id')) {
        delete updates.id;
    }

    // Validar que los campos enviados no tengan valores vacíos
    for (const [key, value] of Object.entries(updates)) {
        if (value === "" || value === null || value === undefined) {
            return res.status(400).json({ message: `El campo '${key}' no puede tener un valor vacío` });
        }
    }

    // Buscar el personaje por id
    const index = personajes.findIndex(p => p.id === idPersonaje);

    if (index === -1) {
        return res.status(404).json({ message: `Personaje con el id #${idPersonaje} no ha sido encontrado` });
    }

    // Actualizar solo los campos enviados
    const personaje = personajes[index];
    const actualizado = { ...personaje, ...updates };

    // Reemplazar en el arreglo
    personajes[index] = actualizado;

    return res.json({ message: "Personaje actualizado", actualizado });

};

