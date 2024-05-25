const express = require('express');
const router = express.Router();
const { makeReservation } = require('../controllers/reservationController');

// Make a reservation
router.post('/make', makeReservation);

module.exports = router;
