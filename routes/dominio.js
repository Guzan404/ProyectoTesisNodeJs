const express = require('express');
const router = express.Router();
const dominioController = require('../controllers/dominio');
const Estudiante = require('../models/estudiante');
router.get('/config', dominioController.mostrarFormulario);
router.get('/start', dominioController.start);

module.exports = router;