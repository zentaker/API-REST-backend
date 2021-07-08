/*
Ruta: /api/login


*/
const {Router} = require('express');
const { login } = require('../controllers/auth.controler')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.post( '/', [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validarCampos

    
],login )





module.exports = router;