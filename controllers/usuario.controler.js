const usuarioModel = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


//obtener los usuarios
const getUsuarios = async (req, res) => {

    const usuarios = await usuarioModel.find({}, 'nombre email role google'); //llaves para espesificar un filtro
    res.json({
        ok: true,
        usuarios,
        uid: req.uid // usuario que hizo la peticion
    });
}
const crearUsuario = async (req, res) => { //para utilizar await tiene que estar dento de una funacion aysinc

    const {email, password, nombre} = req.body;
    
/*     //generar los errores 
    const errores = validationResult(req); //va a crear un arreglod er erores
    if(!errores.isEmpty()) { //si no esta vacio
        //hay errores
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        })

    } */

    //verificacion de un campo duplicado en la bd
    try {
        //hacer una busqueda a la bd
        const existeEmail = await usuarioModel.findOne({email});
        if(existeEmail) {
            //colocar return para evitar errores
            return res.status(400).json({
                ok: false,
                msg: 'el correo ya esta registrado'
            })
        }


        //crear instancia de modelo
        const usuario = new usuarioModel(req.body);

        //encriptar contrasena
        const salt = bcrypt.genSaltSync(); //data de manera aleatorea
        usuario.password = bcrypt.hashSync(password, salt); //encriptacion de contrasenia

        //grabar en MongoDB
        await usuario.save(); //await para esperar que se resuelva 

        //generar el token - JWT
        const token = await generarJWT(usuario.id); //regresa una promesa


        res.json({
             ok: true,
             usuario,
             token
        })
    } catch(error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg:'error inesperado revisar logs'
        })
    }

}

const actualizarUsuario = async(req, res=response) => {

    const uid = req.params.id;


    try {

        const usuarioDB = await usuarioModel.findById(uid);
        //si eso se encuentra existe un usuario con ese id

        if(!usuarioDB) {//si no se encuentra el usuario
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'

            })

        }
        //si llegamos a este punto el usuario existe
        // TODO: Validar token y comprobar su es el usuario correcto
        const {password, google,email,...campos} = req.body;


        //si el usuario de BD es diferente al email
        if(usuarioDB.email !== email ) {

            //sin son diferentes hago la verificacion de email   
            const existeEmail = await usuarioModel.findOne({ email: req.body.email});
            if(existeEmail) {
                //no va a actualizar y va a ostrar un error
                return res.status(400).json({
                    ok: false,
                    msg: 'ya existe un usuario con ese email'
                })
            }
        }

        //anadir el campo que quiero actualizar
        campos.email = email;

        //eliminar informacion obligatoria
        //con el destructuring lo evitas
      /*   delete campos.password;
        delete campos.google; */

        const usuarrioActualizado = await usuarioModel.findByIdAndUpdate(uid, campos, {new: true});



        res.json({
            ok:true,
            usuario: usuarrioActualizado
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })

    }

}
const borrarUsuario = async(req, res) => {
    const uid = req.params.id;
    try {
        const  usuarioDB = await usuarioModel.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });

        }
        await usuarioModel.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'usuario eliminado ' + uid

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }

}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}