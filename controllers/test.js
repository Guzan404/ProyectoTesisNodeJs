const Estudiante = require('../models/estudiante'); // Asegúrate de importar el modelo correcto
const PdfText = require('../models/text'); // Asegúrate de importar el modelo correcto

// Obtiene la lista de textos
exports.getViewKaraoke = async (req, res, next) => {
  try {
    // Obtén los textos del usuario autenticado
    const pdfs = await PdfText.find({ userId: req.user._id });

    // Obtén la lista de estudiantes (ajusta según tu modelo y necesidades)
    const estudiantes = await Estudiante.find({ userId: req.user._id });

    // Renderiza la vista con las opciones
    res.render('karaoke/test', {
      pageTitle: 'Karaoke',
      path: 'karaoke/test',
      pdfs: pdfs,
      estudiantes: estudiantes, // Pasa la lista de estudiantes a la vista
    });
  } catch (error) {
    // Maneja los errores
    res.status(500).json({ error: 'Error al obtener la lista de textos', details: error.message });
  }
};
