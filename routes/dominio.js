const express = require('express');
const router = express.Router();
const dominioController = require('../controllers/dominio');
const Estudiante = require('../models/estudiante');
router.get('/config', dominioController.mostrarFormulario);
router.post('/manejar-formulario', dominioController.manejarFormulario);

module.exports = router;