const mongoose = require('mongoose');

const pdfTextSchema = new mongoose.Schema({
  name: String,
  content: String, // Cambiado de Buffer a String
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User',
}
});

module.exports = mongoose.model('PdfText', pdfTextSchema);