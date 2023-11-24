exports.showOptionsPage = async (req, res, next) => {
  try {
    // Obtén los textos del usuario autenticado
    const pdfs = await PdfText.find({ userId: req.user._id });

    // Renderiza la vista con las opciones
    res.render('text/karaoke', {
      pageTitle: 'Configurar Opciones de Karaoke',
      path: 'text/karaoke',
      pdfs: pdfs,
    });
  } catch (error) {
    // Maneja los errores
    res.status(500).json({ error: 'Error al obtener la lista de textos', details: error.message });
  }
};

exports.startKaraoke = async (req, res, next) => {
  try {
    const { text, speed, startPosition } = req.body;

    // Crea un nuevo objeto Test con los detalles proporcionados
    const test = new Test({
      velocidadLectura: speed,
      palabrasMinuto: 0, // Ajusta según tus necesidades
      totalPalabrasErroneas: 0, // Ajusta según tus necesidades
      textoId: text,
      estudianteId: req.user.estudianteId, // Ajusta según tus necesidades
      userId: req.user._id,
      fecha: new Date(),
      observaciones: '',
      inicioKaraoke: startPosition
    });

    await test.save();

    res.redirect('/karaoke'); // Redirige a donde sea necesario después de iniciar el karaoke
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Error al iniciar el karaoke' });
  }
};
