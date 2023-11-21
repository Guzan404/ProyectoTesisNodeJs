const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
    nombre:{
        type:String,
        require:true
    },
    apellido:{
        type:String,
        require:true,
    },
    edad:{
        type:Number,
        require:true
    },
    curso:{
        type:String,
        require:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    }
});

// se exporta el modelo y  se le asigna el nombre de estudiante
module.exports = mongoose.model('Estudiante',estudianteSchema)

