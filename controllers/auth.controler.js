const {response} = require('express');
const usuarioModel = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {
        const usuarioDB = await usuarioModel.findOne({email});

        //si no existe el usuario
        if(!usuarioDB) {
            //verificar email
            return res.status(404).json({
                ok: false,
                msg: 'contrasena y email no valida'
            })
        }

        //verificar contrasena
        const valiPassword = bcrypt.compareSync(password, usuarioDB.password);

        //si eso regresa false
        if(!valiPassword) {
            return res.status(400).json({
                ok:false,
                msg: 'contrasena y pasword no valido'
            });

        }

        //generar el token - JWT
        const token = await generarJWT(usuarioDB.id); //regresa una promesa

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'contactate co nel administrador'
        })
        
    }

}

module.exports = {
    login
}