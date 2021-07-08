const express = require('express');
require('dotenv').config();
const {dbConection} = require('./db/config');
const cors = require('cors');
//middlewares
//funciones que se ejecutan antes de otras
//la informacion llege como uno lo espera

//crear el servidor express
const app = express();

//configurar cors
app.use(cors());

//lectura y parseo de body
app.use(express.json());

console.log(process.env.PORT)

//base de datos
dbConection();

// emviar com un routing
app.use('/api/usuarios',require('./routes/usuarios.routes') );
app.use('/api/login',require('./routes/auth.routes') );

app.listen(process.env.PORT, () =>{
    console.log('servidor corriendo en puerto ' + process.env.PORT)
})


