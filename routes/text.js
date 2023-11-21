const express = require('express');
const router = express.Router();
const textController = require('../controllers/text');

router.get('/upload', textController.getViewText);
router.post('/upload', textController.uploadPdf, textController.postPdf);

router.get('/list', textController.listTexts); // Nueva ruta para listar los textos
module.exports = router;

