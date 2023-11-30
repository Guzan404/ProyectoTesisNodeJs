const multer = require('multer');
const PdfText = require('../models/text'); // Asegúrate de importar el modelo correcto
const pdfParse = require('pdf-parse');

// Configuración de Multer
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('El archivo debe ser de tipo PDF'));
    }
    cb(null, true);
  },
});

exports.getViewText = async (req, res, next) => {
  try {
    const pdfs = await PdfText.find({ userId: req.user._id });
    res.render('text/upload', {
      pageTitle: 'Añadir texto',
      path: 'text/upload',
      editing: false,
      pdfs: pdfs,
    });
  } catch (error) {
    res.status(500).render('error', { error: 'Error al obtener la lista de textos' });
  }
};

exports.uploadPdf = upload.single('pdfFile');

exports.postPdf = async (req, res, next) => {
  try {
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({ error: 'Por favor, seleccione un archivo PDF' });
    }

    const dataBuffer = uploadedFile.buffer;
    const data = await pdfParse(dataBuffer);

    const pdf = new PdfText({
      name: uploadedFile.originalname,
      content: data.text,
      userId: req.user._id,
      curso: req.body.curso,
    });

    // Comprobar que el curso no está vacío
    if (!pdf.curso) {
      return res.status(400).json({ error: 'Debe seleccionar un curso' });
    }

    // Guardar el curso en la base de datos junto con el texto
    await pdf.save();

    res.redirect('/text/upload');
  } catch (error) {
    // No hacer nada
  }
};
exports.listTexts = async (req, res, next) => {
  try {
    const pdfs = await PdfText.find({ userId: req.user._id });
    res.render('text/upload', {
      pageTitle: 'Lista de Textos',
      path: 'text/upload',
      pdfs: pdfs,
    });
  } catch (error) {
    res.status(500).render('error', { error: 'Error al obtener la lista de textos' });
  }
};


exports.getEditText = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/text/upload');
  }
  const prodId = req.params.pdfId;
  PdfText.findById(prodId)
    .then(pdfText => {
      if (!pdfText) {
        return res.redirect('/text/upload');
      }
      res.render('text/edit', {
        pageTitle: 'Editar Texto',
        path: 'text/edit',
        editing: editMode,
        pdfText: pdfText,  // Asegúrate de pasar pdfText al renderizar la vista
      });
    })
    .catch(err => console.log(err));
};

exports.postEditText = async (req, res, next) => {
  try {
    const prodId = req.body.pdfTextId; // Cambiado de pdfId a pdfTextId
    const updatedName = req.body.name;
    const updatedContent = req.body.content;

    // Actualiza el nombre y contenido del texto en la base de datos
    const pdfText = await PdfText.findByIdAndUpdate(prodId, { name: updatedName, content: updatedContent }, { new: true });

    if (!pdfText) {
      return res.status(404).render('error', { error: 'Texto no encontrado' });
    }

    console.log('Contenido actualizado');
    // Redirige a la misma página después de la actualización
    res.redirect('/text/upload');
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el texto', details: error.message });
  }
};


exports.getKaraokeView = async (req, res, next) => {
  try {
    const textId = req.params.id;
    // Lógica para obtener el texto con el ID textId
    const text = await PdfText.findById(textId);
    res.render('text/karaoke', { pageTitle: 'Karaoke', path: 'text/karaoke', text: text });
  } catch (error) {
    res.status(500).render('error', { error: 'Error al obtener el texto para karaoke' });
  }
};

exports.deleteText = async (req, res, next) => {
  try {
    const pdfId = req.body.pdfId;

    // Eliminar el texto de la base de datos
    await PdfText.findByIdAndDelete(pdfId);

    // Redirigir a la misma página después de borrar
    res.redirect('/text/upload');
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar el texto', details: error.message });
  }
};