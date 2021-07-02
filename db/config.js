const mongoose = require('mongoose');
require('dotenv').config();


const dbConection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        
        });
        console.log('db online')
    

    }catch (error) {
        console.log('error');
    }

}

module.exports = {
    dbConection
}