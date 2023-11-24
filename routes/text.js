const express = require('express');
const router = express.Router();
const textController = require('../controllers/text');

router.get('/upload', textController.getViewText);
router.post('/upload', textController.uploadPdf, textController.postPdf);

// Rutas para editar y borrar
router.get('/edit/:pdfId', textController.getEditText);
router.post('/edit', textController.postEditText);

// Ruta para ir a la vista de karaoke
router.get('/karaoke/:id', textController.getKaraokeView);

// Ruta para borrar un texto
router.post('/delete', textController.deleteText);

module.exports = router;
