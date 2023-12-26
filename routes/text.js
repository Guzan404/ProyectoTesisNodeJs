const express = require('express');
const router = express.Router();
const textController = require('../controllers/text');
const isAuth = require('../middleware/is-auth');
router.get('/upload',isAuth, textController.getViewText);
router.post('/upload',isAuth, textController.uploadPdf, textController.postPdf);

// Rutas para editar y borrar
router.get('/edit/:pdfId',isAuth, textController.getEditText);
router.post('/edit',isAuth, textController.postEditText);


// Ruta para borrar un texto
router.post('/delete',isAuth, textController.deleteText);

module.exports = router;
