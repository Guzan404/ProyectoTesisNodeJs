const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    palabrasMinuto: {
        type: Number,
        required: true
    },
    totalPalabrasErroneas: {
        type: Number,
        required: true
    },
    textoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'PdfText'
    },
    estudianteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Estudiante'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    fecha: {
        type: Date,
        required: true
    },
    observaciones: {
        type: String
    },
    contenidoReconocimiento: {
        type: [String]
    },
});

module.exports = mongoose.model('Test', testSchema);
