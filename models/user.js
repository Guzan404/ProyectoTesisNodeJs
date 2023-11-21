const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nombre:{
        type:String,
        require:true
    },
    correo:{
        type:String,
        require:true,
        unique:true
    },
    contraseña:{
        type:String,
        require:true
    }
});


// se exporta el modelo y  se le asigna el nombre de usuarios

module.exports = mongoose.model('User',userSchema)