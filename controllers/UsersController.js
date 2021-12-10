const express = require('express');
const { Usuario } = require('../models/Usuario');
const { validarUsuario } = require('../utils/authUtils');

const router = express.Router();

router.post('/new', async (request, response) => {
    //este cuerpo de la petición debe venir con una estructura 
    //json con los atributos del documento usuario para que sea valido.
    const usr = new Usuario(request.body); 
    try {
        await usr.save();
        response.send({ "login": usr.login, "mensaje" : "Usuario registrado con exito." });
    }catch (e) {
        response.status(500).send("Ocurrió un error en la base de datos de usuarios.");
        console.log(e);
    }
    
});

//JSON del Cuerpo de la petición de inicio de sesión
//{ username: xxxxxx, password: xxxxxx }
router.post('/auth', async (request, response) => {
    try {
        const { tokenRefresco, tokenAcceso } = await validarUsuario(request.body);
        console.log("Respondiendo inicio de sesión.")
        response.cookie('RTC',tokenRefresco, { httpOnly: true })
                .json({ token: tokenAcceso });
    }catch (e) {
        console.log("Error al intentar iniciar sesión: ");
        console.log(e);
        response.status(403).send("Nombre de usuario o contraseña incorrecta.");
    }
});

module.exports = router;