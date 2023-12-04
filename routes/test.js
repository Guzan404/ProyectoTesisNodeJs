// routes.js
const express = require('express');
const router = express.Router();
const karaokeController = require('../controllers/test'); // Asegúrate de importar tu controlador de karaoke (karaokeController)

// Otras rutas...

// Ruta para mostrar la vista de karaoke con las opciones
router.get('/test', karaokeController.getViewKaraoke);
router.get('/start',karaokeController.getViewKaraokeStart);
module.exports = router;
