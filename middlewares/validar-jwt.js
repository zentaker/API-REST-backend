const jwt = require('jsonwebtoken');


//los midlewares son lo mismo que cualquier controlado solo que con next
const validarJWT = (req, res, next) =>{
    //leer el token - desde headers
    const token = req.header('x-token');
    //si no hay ningun token
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la peticion '
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid;
        //llamar si todo sale bien
        next();

        
    } catch (error) {
        //el token no es valido
        return  res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
        
    }


  
}

module.exports = {
    validarJWT
}