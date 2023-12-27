const Test = require('../models/test');
const Estudiante = require('../models/estudiante');
const Text = require('../models/text');

exports.mostrarFormulario = async (req, res, next) => {
  try {
    // Obtén los textos del usuario autenticado
    const pdfs = await Text.find({ userId: req.user._id });

    // Obtener estudiantes asociados al usuario
    const estudiantes = await Estudiante.find({ userId: req.user._id });
    // Obtener cursos asociados al usuario
    const cursos = await Estudiante.distinct('curso', { userId: req.user._id });
    res.render('dominio/config', {
      pageTitle: 'Config dominio',
      path: 'dominio/config',
      editing: false,
      pdfs,
      estudiantes,
      cursos,
    });
  } catch (error) {
    console.error('Error al obtener datos de test:', error);
    res.status(500).render('error', { error: 'Error al obtener datos de test' });
  }
};

exports.start = async (req, res) => {
  try {
    const { text, estudiante } = req.query;

    // se obtienen los datos del estudiante desde la base de datos
    const estudianteSeleccionado = await Estudiante.findById(estudiante);
    const texto = await Text.findById(text);
    if (!texto) {
      console.error('El texto no fue encontrado.');
      return res.status(404).send('El texto no fue encontrado.');
    }

    res.render('dominio/start', {
      pageTitle: 'Inicio de Prueba',
      path: 'dominio/start',
      textoContenido: texto.content,
      estudiante: estudianteSeleccionado,
    });
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.guardarResultados = async (req, res) => {
  try {
    const {
      palabrasMinuto,
      totalPalabrasErroneas,
      fecha,
      observaciones,
      contenidoReconocimiento
    } = req.body;

    const textoId = await Text.findOne({ userId: req.user._id }).select('_id');
    const estudianteId = await Estudiante.findOne({ userId: req.user._id }).select('_id');
    const userId = req.user._id;

    // Crea una nueva instancia del modelo Test con los resultados
    const nuevoTest = new Test({
      palabrasMinuto,
      totalPalabrasErroneas,
      fecha,
      observaciones,
      contenidoReconocimiento,
      textoId,
      estudianteId,
      userId
    });

    // Guarda el nuevo test en la base de datos
    await nuevoTest.save();

    // Envía una respuesta al cliente (puedes ajustar según tu lógica)
    res.status(201).json({ mensaje: 'Resultados guardados con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar los resultados.' });
  }
};