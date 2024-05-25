const express = require('express');
const router = express.Router();
const { addComment, deleteComment, fetchCommentsByMovieId } = require('../controllers/commentController');

router.post('/comment/add', addComment);
router.get('/comments/:movieId', fetchCommentsByMovieId);
router.delete('/comments/:id', deleteComment);

module.exports = router;