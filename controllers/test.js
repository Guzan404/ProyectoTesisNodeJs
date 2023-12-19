const Estudiante = require('../models/estudiante');
const Text = require('../models/text'); // Ajusta según el nuevo nombre del modelo);

// Obtiene la lista de textos
exports.getViewKaraoke = async (req, res, next) => {
  try {
    // Obtén los textos del usuario autenticado
    const pdfs = await Text.find({ userId: req.user._id });

    // Obtén la lista de estudiantes (ajusta según tu modelo y necesidades)
    const estudiantes = await Estudiante.find({ userId: req.user._id });

    // Renderiza la vista con las opciones
    res.render('karaoke/test', {
      pageTitle: 'Karaoke',
      path: 'karaoke/test',
      pdfs: pdfs,
      estudiantes: estudiantes,
    });
  } catch (error) {
    // Maneja los errores
    res.status(500).json({ error: 'Error al obtener la lista de textos', details: error.message });
  }
};

// Vista para iniciar el karaoke
exports.getViewKaraokeStart = async (req, res, next) => {
  try {
    // Obtén los textos del usuario autenticado
    const pdfs = await Text.find({ userId: req.user._id });

    // Obtén la lista de estudiantes (ajusta según tu modelo y necesidades)
    const estudiantes = await Estudiante.find({ userId: req.user._id });

    // Obtén el ID del estudiante desde la sesión del usuario o desde donde lo tengas disponible
    const estudianteId = req.user.estudiante; // Ajusta según tu estructura

    // Obtén los textos del curso del estudiante
    const textosCurso = await Text.find({ curso: estudianteId }); // Ajusta según tu modelo Text

    // Configura los datos para la vista "start"
    const data = {
      pdfId: req.query.pdfId,
      speed: req.query.speed,
      date: req.query.date,
      estudiante: req.query.estudiante,
      wordCount: req.query.wordCount || 10000, // Establece un valor predeterminado o ajusta según necesidades
    };

    // Renderiza la vista con las opciones
    res.render('karaoke/start', {
      pageTitle: 'Karaoke',
      path: 'karaoke/start',
      pdfs: pdfs,
      estudiantes: estudiantes,
      textosCurso: textosCurso,
      data: data,
    });
  } catch (error) {
    // Maneja los errores
    res.status(500).json({ error: 'Error al obtener la lista de textos', details: error.message });
  }
};
