const express = require('express');
const router = express.Router();
const karaokeController = require('../controllers/karaoke');
const isAuth = require('../middleware/is-auth');
router.get('/options',isAuth, karaokeController.showOptionsPage);
router.post('/start',isAuth, karaokeController.startKaraoke);

module.exports = router;
