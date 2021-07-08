const jwt = require('jsonwebtoken')

const generarJWT = (uid) => {
    //convertir en una promesa
    return new Promise( (resolve, reject)=> {
           //generar el token
            const payload = {
                uid
            };
            jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '12h'
            }, (err, token) => {
                if(err) {
                    console.log(err);
                    reject('no se pudo generar el jWT')
                } else {
                    resolve(token);
                }
            });



     })

 

}

module.exports = {
    generarJWT
}