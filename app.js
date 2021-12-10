require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const { registrarControladores } = require('./controllers');
const { conectarMongoDB, subscribirCierres } = require('./db/db');

const app = express();
const port = process.env.PORT || 9000;


//Configuramos los middleware de express
app.use(cookieParser()); //procesa los cookies que vienen en las peticiones
app.use(express.urlencoded()); //procesa los queryparam y su codificacion
app.use(express.json()); //procesa los cuerpos de las peticiones que viene en json

//Establecemos conexión con Mongo
conectarMongoDB();

//Registramos las funciones controladoras de nuestro backend
registrarControladores(app);

//Subscribir los watchers para el cierre de la conexión a Mongo
//cuando se termine la ejecución de nuestro backend.
subscribirCierres();

//Lanzamos nuestro backend 
app.listen(port, () => {
    console.log(`Backend corriendo en puerto: ${port}`);
});

