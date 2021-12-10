const { Schema, model } = require('mongoose');
const { hash, genSalt, compare } = require('bcrypt');

const usuarioSchema = new Schema({
    login: {
        type:String,
        unique: true,
        required: [true, 'El nombre de usuario es obligatorio.'],
        max: [20, 'El nombre de usuario excede la longitud permitida.']
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria.']
        
    },
    rol: {
        type: String,
        required: [true, 'El rol del usuario es obligatorio']
    }

},{
    collection: 'Usuarios'
});

usuarioSchema.pre('save', async function (next) {
    console.log('Transformando contraseña...');
    const salt = await genSalt(parseInt(process.env.BCRYPT_ROUNDS));
    this.contrasena =  await hash(this.contrasena, salt);
    next();
});

usuarioSchema.methods.compararPassword = async function(textoPassword) {
    console.log("Comparando passwords...");
    return await compare(textoPassword, this.contrasena);
}

exports.Usuario = model('Usuario', usuarioSchema);