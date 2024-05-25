const express = require('express');
const router = express.Router();
const { addShowtime, listShowtimes } = require('../controllers/showtimeController');

// Add a new showtime
router.post('/add', addShowtime);

// List all showtimes
router.get('/list', listShowtimes);

module.exports = router;
