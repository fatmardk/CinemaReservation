const sql = require('msnodesqlv8');

const server = "LAPTOP-EJE4K8T5\\SQLEXPRESS";
const database = "SinemaRezervasyon";
const userName = "LAPTOP-EJE4K8T5\\USER";
const connectionString = `Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;

const makeReservation = async (req, res) => {
  const { user_id, showtime_id, seat_number, category, price } = req.body;
  const checkSeatsQuery = `
      SELECT COUNT(r.seat_number) AS reservedCount, h.capacity
      FROM Tbl_Reservations r
      JOIN Tbl_Showtimes st ON r.showtime_id = st.showtime_id
      JOIN Tbl_Halls h ON st.hall_id = h.hall_id
      WHERE r.showtime_id = ?
      GROUP BY h.capacity
  `;
  const insertReservationQuery = `
      INSERT INTO Tbl_Reservations (user_id, showtime_id, seat_number, category, price)
      VALUES (?, ?, ?, ?, ?)
  `;

  try {
      // Koltuk sayısını ve salon kapasitesini kontrol et
      sql.query(connectionString, checkSeatsQuery, [showtime_id], (err, result) => {
          if (err) {
              console.log(err);
              return res.status(500).json({ error: "Server internal error." });
          }

          // Sonuçlar uygun formatta mı?
          if (result.length > 0) {
              const { reservedCount, capacity } = result[0];
              if (reservedCount >= capacity) {
                  return res.status(400).json({ error: "No available seats." });
              }
          } else {
              return res.status(400).json({ error: "Invalid showtime ID or no data found." });
          }

          // Rezervasyon yap
          sql.query(connectionString, insertReservationQuery, [user_id, showtime_id, seat_number, category, price], (err, result) => {
              if (err) {
                  console.log(err);
                  return res.status(500).json({ error: "Server internal error." });
              }

              return res.status(201).json({ msg: 'Reservation made successfully.' });
          });
      });
  } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Server internal error." });
  }
};
module.exports = { makeReservation };
