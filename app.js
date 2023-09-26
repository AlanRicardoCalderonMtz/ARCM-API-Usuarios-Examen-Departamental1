//Crear el servidor
const { json } = require('express');
const express = require('express');
const app = express();
// Que tome el puerto establecido a la nube (render )
const puerto = process.env.PORT || 3000;

// Midleware - Intermediario
app.use(express.json())

//Arreglo de objeto de usuarios
let usuarios = [
    { id: 1, nombre: "Luis", correo: "luis@gmail.com", password: "luis123" },
    { id: 2, nombre: "Maria", correo: "maria@gmail.com", password: "maria123" },
    { id: 3, nombre: "Diana", correo: "diana@gmail.com", password: "diana123" },
    { id: 4, nombre: "Perla", correo: "perla@gmail.com", password: "perla123" },
    { id: 5, nombre: "David", correo: "david@gmail.com", password: "david123" },
    { id: 6, nombre: "Jose", correo: "jose@gmail.com", password: "jose123" },
    { id: 7, nombre: "Jenny", correo: "jenny@gmail.com", password: "jenny123" },
    { id: 8, nombre: "Ana", correo: "ana@gmail.com", password: "ana123" },
    { id: 9, nombre: "Lucia", correo: "lucia@gmail.com", password: "lucia123" },
    { id: 10, nombre: "Alan", correo: "alan@gmail.com", password: "alan123" }
]

//Solicitud , respuesta
app.get('/socios/v1/usuarios', (req, res) => {
    //1° Verificar si existen usuarios
    if (usuarios.length > 0) {
        //Existen usuarios
        res.status(200).json({
            estado: 1,
            mensaje: "Existen Usuarios",
            //var : contenido
            users: usuarios
        })
    } else {
        //No existen usuarios
        res.status(404).json({
            estado: 0,
            mensaje: "No se encontraron Usuarios",
            users: usuarios

        })

    }
    //2° Mostrarla con un estado y mensaje
    //3° No existe, mostrar estado y mensaje
    //4° En formato JSON
})

app.get('/socios/v1/usuarios/:id', (req, res) => {
    //  Solo un usuario

    // Obtener el ID del usuario desde los parámetros de la URL
    const userId = req.params.id;

    // Buscar el usuario por su ID en tu arreglo 
    const usuarioEncontrado = usuarios.find(usuario => usuario.id == userId);
    if (usuarioEncontrado) {
        // Si se encontró el usuario, devolverlo en formato JSON
        res.status(200).json({
            estado: 1,
            mensaje: "Usuario encontrado",
            category: usuarioEncontrado
        });
    } else {
        // Si no se encontró el usuario, devolver un mensaje de error en JSON
        res.status(404).json({
            estado: 0,
            mensaje: "Usuario no encontrado",
            category: null
        });
    }
});


// 1° Crear un recurso - crear un usuario
// 2° Requerimos:
//      3° id = Generar un numero aleatorio
//      4° nombre, correo, password = body
app.post('/socios/v1/usuarios', (req, res) => {
    const { nombre, correo, password } = req.body
    const id = Math.round(Math.random() * 1000);

    if (nombre == undefined || correo == undefined || password == undefined) {
        //Hay un error en la solicitud por parte del programador
        res.status(400).json({ 
            estado: 0,
            mensaje: "Faltan parametros en la solicitud",
        })
    } else {
        //En js como se agregan elementos al array -> (push)
        const Usuarios = { id: id, nombre: nombre, correo: correo, password: password }
        const longitud_inicial = usuarios.length;
        usuarios.push(Usuarios)
        if (usuarios.length > longitud_inicial) {
            //All bien por parte del cliente y servidor
            // 200 (todo ok) y 201(creado)
            res.status(201).json({
                estado: 1,
                mensaje: "Usuario creado",
                usuario: Usuarios
            })
        } else {
            //Error del servidor -> 'creador de la API o de la BD, Quien configura el servidor'
            // 500 -> error interno
            res.status(500).json({
                estado: 0,
                mensaje: "Ocurrio un error desconocido"
            })
        }

    }
})

app.put('/socios/v1/usuarios/:id', (req, res) => {
    // Actualizar un recurso - Actualizar un usuario
    //res.send('Actualizar un usuario por su id');

    //id viene -> 'params'
    //nombre, correo, password -> 'body'
    const { id } = req.params;
    const { nombre, correo, password } = req.body

    //verificar que nombre, correo, y password vengan en el body
    if (nombre == undefined || correo == undefined || password == undefined) {
        //
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan parametros en la solicitud"
        })
    } else {
        const posActualizar = usuarios.findIndex(usuario => usuario.id == id)
        if (posActualizar != -1) {
            //Si encontro el usuario con el id buscado
            //Actualizar el usuario
            usuarios[posActualizar].nombre = nombre;
            usuarios[posActualizar].correo = correo;
            usuarios[posActualizar].password = password;

            res.status(200).json({
                estado: 1,
                mensaje: "Usuario actualizado correctamente"
            });
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: "Usuario no encontrado"
            })
        }
    }
})

app.delete('/socios/v1/usuarios/:id', (req, res) => {
    //Eliminar un recurso - Eliminar un usuario
    //res.send('Eliminar un usuario por su id');

    // Obtener el ID de la categoría de los parámetros de la URL
    const { id } = req.params;

    // Buscar la posición de la categoría en el array 'usuarios' por su ID
    const posEliminar = usuarios.findIndex(usuario => usuario.id == id);

    if (posEliminar != -1) {
        // Si se encontró la categoría con el ID buscado, eliminarla del array
        usuarios.splice(posEliminar, 1);

        res.status(201).json({
            estado: 1,
            mensaje: "Usuario eliminado correctamente"
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Usuario no encontrado"
        });
    }

})

app.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto: ', puerto);
})

