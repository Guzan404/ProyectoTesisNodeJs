const multer = require('multer');
const PdfText = require('../models/text');
const pdfParse = require('pdf-parse');

exports.getViewText = (req, res, next) => {
  res.render('text/upload', {
    pageTitle: 'Añadir texto',
    path: 'text/upload',
    editing: false,
  });
};
// Configuración de Multer
const storage = multer.memoryStorage(); // Almacena los datos del archivo en memoria en lugar de guardar en el sistema de archivos

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('El archivo debe ser de tipo PDF'));
    }
    cb(null, true);
  },
});

exports.uploadPdf = upload.single('pdfFile');
// 'pdfFile' debe coincidir con el nombre del campo en el formulario

exports.postPdf = async (req, res, next) => {
  try {
    const uploadedFile = req.file;

    // Verificar si el archivo se cargó correctamente
    if (!uploadedFile) {
      return res.status(400).json({ error: 'Por favor, seleccione un archivo PDF' });
    }

   // Extraer texto del PDF
   const dataBuffer = uploadedFile.buffer;
   const data = await pdfParse(dataBuffer);

   // Guardar información del archivo en la base de datos
   const pdf = new PdfText({
     name: uploadedFile.originalname,
     content: data.text, // Cambiado de uploadedFile.buffer a data.text
     userId: req.user._id, // Asegúrate de tener un usuario autenticado para obtener  userId
   });

    await pdf.save();

    res.redirect('/text/list'); // Redirigir después de la carga
  } catch (error) {
    res.status(500).json({ error: 'Error al subir el archivo PDF', details: error.message });
  }
};

exports.listTexts = async (req, res, next) => {
  try {
    const pdfs = await PdfText.find({ userId: req.user._id });
    res.render('text/list', {
      pageTitle: 'Lista de Textos',
      path: 'text/list',
      pdfs: pdfs,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de textos', details: error.message });
  }
};
