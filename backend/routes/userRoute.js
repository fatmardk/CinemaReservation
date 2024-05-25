const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');

// Register a new user
router.post('/register', register);

// User login
router.post('/login', login);

module.exports = router;
