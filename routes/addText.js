const express = require('express');
const pdfController = require('../controllers/pdfController');

const router = express.Router();

router.post('/upload', pdfController.uploadPDF);

module.exports = router;