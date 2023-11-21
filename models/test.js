const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    velocidadLectura: {
        type: Number,
        required: true
    },
    palabrasMinuto:{
        type:Number,
        require:true
    },
    totalPalabrasErroneas:{
        type:Number,
        require:true
    },
    textoId: {
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'Text'
    },
    estudianteId: {
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'Estudiante'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    },
    fecha:{
        type:Date,
        require:true
    },
    observaciones:{
        type:String
    }
});

module.exports = mongoose.model('Test',testSchema)