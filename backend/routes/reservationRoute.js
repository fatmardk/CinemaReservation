const express = require("express");
const router = express.Router();
const {
  makeReservation,
  getReservedSeats,
} = require("../controllers/reservationController");


router.post("/make", makeReservation);
router.get("/seats/:showtime_id", getReservedSeats);

module.exports = router;
