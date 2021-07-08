const { response } = require('express');
const { validationResult } = require('express-validator')

const validarCampos = (req, res = response, next) => {

    const errores = validationResult(req); //va a crear un arreglod er erores
    if(!errores.isEmpty()) { //si no esta vacio
        //hay errores
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        })

    } 
    //si llega a este punto es por que no hay errores
    next();

}

//exportar la funcion
module.exports = {
    validarCampos
}