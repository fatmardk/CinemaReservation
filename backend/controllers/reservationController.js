const sql = require("msnodesqlv8");

const server = "LAPTOP-EJE4K8T5\\SQLEXPRESS";
const database = "SinemaRezervasyon";
const userName = "LAPTOP-EJE4K8T5\\USER";
const connectionString = `Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;

const getReservedSeats = async (req, res) => {
  const { showtime_id } = req.params;

  const getReservedSeatsQuery = `
      SELECT seat_number FROM Tbl_Reservations 
      WHERE showtime_id = ${showtime_id}
  `;
  const getHallCapacityQuery = `
      SELECT h.capacity FROM Tbl_Halls h
      JOIN Tbl_Showtimes s ON h.hall_id = s.hall_id
      WHERE s.showtime_id = ${showtime_id}
  `;

  try {
    sql.query(connectionString, getReservedSeatsQuery, (err, reservedSeatsResult) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Server internal error." });
      }

      const seatNumbers = reservedSeatsResult.map((row) => row.seat_number);

      sql.query(connectionString, getHallCapacityQuery, (err, hallCapacityResult) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Server internal error." });
        }

        if (hallCapacityResult.length > 0) {
          const { capacity } = hallCapacityResult[0];
          return res.status(200).json({ reservedSeats: seatNumbers, hallCapacity: capacity });
        } else {
          return res.status(404).json({ error: "Hall capacity not found." });
        }
      });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Server internal error." });
  }
};

const makeReservation = async (req, res) => {
  const { user_id, showtime_id, seat_number, category } = req.body;

  // Aynı gösterim ve koltuk numarası için mevcut rezervasyon olup olmadığını kontrol et
  const checkReservationQuery = `
      SELECT * FROM Tbl_Reservations 
      WHERE showtime_id = ${showtime_id} AND seat_number = ${seat_number}
  `;

  try {
    sql.query(connectionString, checkReservationQuery, (err, checkResult) => {
      if (err) {
        console.log(err);
        if (!res.headersSent) {
          return res.status(500).json({ error: "Server internal error." });
        }
      }

      if (checkResult.length > 0) {
        // Aynı gösterim ve koltuk numarası için bir rezervasyon var
        if (!res.headersSent) {
          return res
            .status(400)
            .json({ error: "This seat is already reserved." });
        }
      } else {
        // Aynı gösterim ve koltuk numarası için rezervasyon yok, fiyatı al ve rezervasyon ekle
        const getPriceQuery = `
                  SELECT price FROM Tbl_Prices WHERE category = '${category}'
              `;

        sql.query(connectionString, getPriceQuery, (err, priceResult) => {
          if (err) {
            console.log(err);
            if (!res.headersSent) {
              return res.status(500).json({ error: "Server internal error." });
            }
          }

          if (priceResult.length === 0) {
            if (!res.headersSent) {
              return res
                .status(404)
                .json({ error: "Price not found for the given category." });
            }
          }

          const price = priceResult[0].price;

          // Rezervasyonu ekle
          const addReservationQuery = `
                      INSERT INTO Tbl_Reservations (user_id, showtime_id, seat_number, category, price)
                      VALUES (${user_id}, ${showtime_id}, ${seat_number}, '${category}', ${price})
                  `;

          sql.query(connectionString, addReservationQuery, (err, result) => {
            if (err) {
              console.log(err);
              if (!res.headersSent) {
                return res
                  .status(500)
                  .json({ error: "Server internal error." });
              }
            }
            if (!res.headersSent) {
              return res
                .status(200)
                .json({ message: "Reservation successful." });
            }
          });
        });
      }
    });
  } catch (error) {
    console.log(error.message);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Server internal error." });
    }
  }
};

module.exports = { makeReservation, getReservedSeats };
