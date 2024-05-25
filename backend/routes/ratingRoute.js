const express = require('express');
const router = express.Router();
const { addRating, fetchRatingsByMovieId, deleteRating } = require('../controllers/ratingController');

router.post('/ratings', addRating);
router.get('/ratings/:movieId', fetchRatingsByMovieId);
router.delete('/ratings/:id', deleteRating);

module.exports = router;
