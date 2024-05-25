const express = require('express');
const router = express.Router();
const { addMovie, deleteMovie, fetchMovieById, getAllMovies } = require('../controllers/movieController');


router.post('/movie/add', addMovie);
router.get('/movies/:id', fetchMovieById);
router.get('/movies', getAllMovies);
router.delete('/movies/:id', deleteMovie);

module.exports = router;