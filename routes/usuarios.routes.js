/*
Ruta: /api/usuarios


*/


const {Router} = require('express');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuario.controler');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//en get usuarios puede obtener la informacion que se obtuvo desde el midLEWARE
router.get('/',validarJWT, getUsuarios);

//le tienen que llegar el email, nombre y password
//revisar validaciones
router.post('/',[
    //para enviar varios middlewares
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //enviarle mesajes personalizados
    check('password', 'la contrasena es obigatoria').not().isEmpty(),
    check('email', 'El email es obigatorio').isEmail(),
    //tiene que ser el ultimo a llamar cuando se lanzen los errores
    validarCampos,//despues de los checks el custom middleware
    

],crearUsuario );//segundo argumento

//actualizar usuario
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //enviarle mesajes personalizados
    check('email', 'El email es obigatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos,

] , actualizarUsuario );

//eliminar un usuario
router.delete('/:id', validarJWT , borrarUsuario );







module.exports = router