const express = require('express');
const router = express.Router();
const { listMovies } = require('../controllers/movieController');
// Örnek bir GET route tanımı
router.get('/list', listMovies);

module.exports = router;
