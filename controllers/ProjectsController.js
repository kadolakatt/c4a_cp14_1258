const express = require('express');
const { authGuard } = require('../middlewares/auth');
const { Proyecto } = require('../models/Proyecto');

const router = express.Router();

//Endpoint no asegurado
//router.get('/all',async (request, response) =>{

//Endpoint asegurado, solo este metodo
router.get('/all' , authGuard  ,async (request, response) =>{
    console.log("Listado de proyectos.");
    console.log(request.jwtData);

    const page = parseInt(request.query.page);
    const limit = parseInt(request.query.limit);

    const datos = await Proyecto.find({},{},{ sort: { nombre:1 }, skip: ((page-1)*limit), limit: limit }).exec();
    response.send(datos);

});

module.exports = router;