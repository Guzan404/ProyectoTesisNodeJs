// routes.js
const express = require('express');
const router = express.Router();
const karaokeController = require('../controllers/test'); // Asegúrate de importar tu controlador de karaoke (karaokeController)
const isAuth = require('../middleware/is-auth');
// Otras rutas...

// Ruta para mostrar la vista de karaoke con las opciones
router.get('/test',isAuth, karaokeController.getViewKaraoke);
router.get('/start',isAuth,karaokeController.getViewKaraokeStart);
module.exports = router;
