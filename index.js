const express = require('express');
require('dotenv').config();
const {dbConection} = require('./db/config');
const cors = require('cors');


//crear el servidor express
const app = express();

//configurar cors
app.use(cors());

console.log(process.env.PORT)

//base de datos
dbConection();

app.listen(process.env.PORT, () =>{
    console.log('servidor corriendo en puerto ' + process.env.PORT)
})

//cors controla los asessos al servidor
