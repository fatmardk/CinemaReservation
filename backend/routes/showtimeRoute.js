const express = require('express');
const router = express.Router();
const { addShowtime, listShowtimes, getMoviesByHall, getShowtimesWithMoviesAndHalls, getShowtimesByMovie } = require('../controllers/showtimeController');

// Add a new showtime
router.post('/add', addShowtime);

// List all showtimes
router.get('/list', listShowtimes);
router.get('/', getShowtimesWithMoviesAndHalls);
router.get('/hall/:hall_id', getMoviesByHall);
router.get('/movie/:movie_id', getShowtimesByMovie);

module.exports = router;
