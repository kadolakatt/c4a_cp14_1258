const { sign } = require('jsonwebtoken');
const { Usuario } = require('../models/Usuario');

const getTokenPair = async (user) => {
    const tokenAcceso = await sign(
                        { _id: user._id, rol: user.rol, login: user.login },
                        process.env.JWT_ACCESS_SECRET,
                        { expiresIn: '5m' });
    const tokenRefresco = await sign(
                        { _id: user._id, rol: user.rol, login: user.login },
                        process.env.JWT_REFRESH_SECRET,
                        { expiresIn: '7d' });
    console.log("Tokens generados ");
    console.log({ tokenRefresco, tokenAcceso });
    return { tokenRefresco, tokenAcceso };
}


const validarUsuario = async (usuario_peticion) => {
    const user = await Usuario.findOne({ login: usuario_peticion.username });
    
    if (!user) throw new Error('Usuario o contraseña no valido.');
    console.log('Validando login...');
    const passwordMatch = await user.compararPassword(usuario_peticion.password)
    if (!passwordMatch) throw new Error('Usuario o contraseña no valido.');

    return await getTokenPair(user);

}

exports.validarUsuario = validarUsuario;
exports.getTokenPair = getTokenPair;