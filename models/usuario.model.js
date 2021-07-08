//ciertas resitriciones par alos modelos de datos
const {Schema, model} = require('mongoose')


//una collecion en mongoDB
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

//quitar re la respuesta ciertos parametros
UsuarioSchema.method('toJSON', function() {
    const {__v, _id, password, ...object} = this.toObject();

    //definir otro nombre para el id
    object.uid = _id;

    //retomar el objeto 
    return object;
})

//implementacion del modelo
module.exports = model('Usuario', UsuarioSchema);