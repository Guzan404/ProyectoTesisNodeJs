const express = require('express');
const router = express.Router();
const karaokeController = require('../controllers/karaoke');

router.get('/options', karaokeController.showOptionsPage);
router.post('/start', karaokeController.startKaraoke);

module.exports = router;
