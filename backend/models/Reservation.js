class Reservation {
  constructor(user_id, showtime_id, seat_number, category, price) {
      this.user_id = user_id;
      this.showtime_id = showtime_id;
      this.seat_number = seat_number;
      this.category = category;
      this.price = price;
  }
}

module.exports = Reservation;
