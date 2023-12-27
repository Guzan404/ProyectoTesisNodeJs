
const express = require('express');
const router = express.Router();
const resultadosController = require('../controllers/resultados');

router.get('/resultadosView', resultadosController.mostrarResultados);

module.exports = router;