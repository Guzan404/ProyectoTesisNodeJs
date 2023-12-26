const express = require('express');
const router = express.Router();
const dominioController = require('../controllers/dominio');
const isAuth = require('../middleware/is-auth');
router.get('/config',isAuth, dominioController.mostrarFormulario);
router.get('/start',isAuth, dominioController.start);
router.post('/guardarResultados',isAuth, dominioController.guardarResultados);

module.exports = router;