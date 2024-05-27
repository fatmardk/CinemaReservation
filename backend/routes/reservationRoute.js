const express = require("express");
const router = express.Router();
const {
  makeReservation,
  getReservedSeats,
  getShowtimeDetails
} = require("../controllers/reservationController");


router.post("/make", makeReservation);
router.get("/seats/:showtime_id", getReservedSeats);
router.get("/moviedetails/:showtime_id", getShowtimeDetails);

module.exports = router;
