const Test = require('../models/test');
const Estudiante = require('../models/estudiante'); // Asegúrate de tener la ruta correcta al modelo
const Text = require('../models/text'); // Ajusta según el nuevo nombre del modelo);


exports.mostrarFormulario = async (req, res, next) => {
    try {
    // Obtén los textos del usuario autenticado
        const pdfs = await Text.find({ userId: req.user._id });

        // Obtener estudiantes asociados al usuario
        const estudiantes = await Estudiante.find({ userId: req.user._id });

        // Obtener cursos asociados al usuario
        const cursos = await Estudiante.find({ userId: req.user._id }).distinct('curso');

        res.render('dominio/config', {
            pageTitle: 'Config dominio',
            path: 'dominio/config',
            editing: false,
            pdfs: pdfs,
            estudiantes: estudiantes,
            cursos: cursos,
        });
    } catch (error) {
        res.status(500).render('error', { error: 'Error al obtener datos de test' });
    }
};


// Función para manejar el envío del formulario
exports.manejarFormulario = async (req, res) => {
  try {
    // Obtén los datos del formulario desde el cuerpo de la solicitud
    const { textoId, estudianteId, curso, fecha, observaciones } = req.body;

    // Crea una nueva instancia del modelo Test con los datos del formulario
    const nuevoTest = new Test({
      textoId,
      estudianteId,
      userId: req.user._id, // Asume que tienes una sesión de usuario
      curso,
      fecha,
      observaciones,
      // Agrega más campos según sea necesario
    });

    // Guarda el nuevo test en la base de datos
    await nuevoTest.save();

    // Redirige a la página principal o a donde sea necesario después de enviar el formulario
    res.redirect('/ruta-de-destino');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};