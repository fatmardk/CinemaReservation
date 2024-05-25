const express = require('express');
const router = express.Router();
const { deleteUser, fetchUserById, getAllUsers } = require('../controllers/userController');

router.get('/users/:id', fetchUserById);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;