const Test = require('../models/test');

exports.mostrarResultados = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Busca todos los resultados asociados al usuario actual
    const resultados = await Test.find({ userId }).populate('estudianteId textoId');
    
    if (!resultados || resultados.length === 0) {
      return res.status(404).render('error', { error: 'Resultados no encontrados' });
    }
    res.render('resultados/resultadosView', {
      pageTitle: 'Resultados de Prueba',
      path: 'resultados/resultadosView',
      resultados,
    });
  } catch (error) {
    console.error('Error al obtener resultados:', error);
    res.status(500).render('error', { error: 'Error al obtener resultados' });
  }
};
