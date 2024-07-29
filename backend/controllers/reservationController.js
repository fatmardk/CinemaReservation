const sql = require("msnodesqlv8");

const server = "LAPTOP-EJE4K8T5\\SQLEXPRESS";
const database = "SinemaRezervasyon";
const userName = "LAPTOP-EJE4K8T5\\USER";
const connectionString = `Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;

const getReservedSeats = async (req, res) => {
  const { showtime_id } = req.params;

  const getReservedSeatsQuery = `
      SELECT seat_number FROM Tbl_Reservations 
      WHERE showtime_id = ?
  `;
  const getHallCapacityQuery = `
      SELECT h.capacity FROM Tbl_Halls h
      JOIN Tbl_Showtimes s ON h.hall_id = s.hall_id
      WHERE s.showtime_id = ?
  `;

  try {
    sql.query(
      connectionString,
      getReservedSeatsQuery,
      [showtime_id],
      (err, reservedSeatsResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Server internal error." });
        }

        const seatNumbers = reservedSeatsResult.map((row) => row.seat_number);

        sql.query(
          connectionString,
          getHallCapacityQuery,
          [showtime_id],
          (err, hallCapacityResult) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Server internal error." });
            }

            if (hallCapacityResult.length > 0) {
              const { capacity } = hallCapacityResult[0];
              return res
                .status(200)
                .json({ reservedSeats: seatNumbers, hallCapacity: capacity });
            } else {
              return res
                .status(404)
                .json({ error: "Hall capacity not found." });
            }
          }
        );
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server internal error." });
  }
};

const makeReservation = async (req, res) => {
  const { user_id, showtime_id, seat_number, priceCategory, discountDay } =
    req.body;
    console.log("1", priceCategory, " || ", discountDay);
  const date = new Date();
  const currentDate = date.toLocaleDateString("en-US", { weekday: "long" });
console.log("cd, dd", currentDate, discountDay);
  const tempBool = currentDate == discountDay;
  console.log(tempBool);
  let priceCat = priceCategory;
  if (tempBool) {
    priceCat = priceCategory == 1 ? 3 : 4;
  }
  // console.log("2 |", "pricecategory:", priceCategory, " || pricecat", priceCat);

  const checkReservationQuery = `
      SELECT * FROM Tbl_Reservations 
      WHERE showtime_id = ? AND seat_number = ?
  `;

  try {
    sql.query(
      connectionString,
      checkReservationQuery,
      [showtime_id, seat_number],
      (err, checkResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Server internal error." });
        }

        if (checkResult.length > 0) {
          return res
            .status(400)
            .json({ error: "This seat is already reserved." });
        } else {
          const getPriceQuery = `
            SELECT price FROM Tbl_Prices WHERE price_id = ?
          `;

          sql.query(
            connectionString,
            getPriceQuery,
            [priceCat],
            (err, priceResult) => {
              if (err) {
                console.error(err);
                return res
                  .status(500)
                  .json({ error: "Server internal error." });
              }

              if (priceResult.length === 0) {
                return res.status(404).json({
                  error: "Price not found for the given category ID.",
                });
              }

              const price = priceResult[0].price;
              console.log("price", price);
              const discountedPrice = price;
              console.log("discountedprice", discountedPrice);

              let priceTemp;
              switch (priceCategory) {
                case 1:
                  priceTemp = "Ogrenci";
                  break;
                case 2:
                  priceTemp = "Sivil";
                  break;
                case 3:
                  priceTemp = "OgrenciCars";
                  break;
                case 4:
                  priceTemp = "SivilCars";
                  break;
              }

              console.log("pricetemp", priceTemp);

              const addReservationQuery = `
                INSERT INTO Tbl_Reservations (user_id, showtime_id, seat_number, category, price)
                VALUES (?, ?, ?, ?, ?)
              `;

              sql.query(
                connectionString,
                addReservationQuery,
                [user_id, showtime_id, seat_number, priceTemp, discountedPrice],
                (err, result) => {
                  if (err) {
                    console.error(err);
                    return res
                      .status(500)
                      .json({ error: "Server internal error." });
                  }
                  return res.status(200).json({
                    message: "Reservation successful.",
                    discountedPrice: discountedPrice, // Return discounted price
                  });
                }
              );
            }
          );
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server internal error." });
  }
};

const getShowtimeDetails = async (req, res) => {
  const { showtime_id } = req.params;

  const getShowtimeDetailsQuery = `
    SELECT 
      s.start_time, 
      s.end_time, 
      m.title AS movie_title, 
      h.name AS hall_name
    FROM Tbl_Showtimes s
    JOIN Tbl_Movies m ON s.movie_id = m.movie_id
    JOIN Tbl_Halls h ON s.hall_id = h.hall_id
    WHERE s.showtime_id = ?
  `;

  const getPricesQuery = `
    SELECT 
      price_id,
      category,
      price
    FROM Tbl_Prices
  `;

  try {
    // Get Showtime Details
    sql.query(
      connectionString,
      getShowtimeDetailsQuery,
      [showtime_id],
      (err, showtimeDetailsResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Server internal error." });
        }

        if (showtimeDetailsResult.length === 0) {
          return res.status(404).json({ error: "Showtime details not found." });
        }

        const showtimeDetails = showtimeDetailsResult[0];

        // Get Prices
        sql.query(connectionString, getPricesQuery, (err, pricesResult) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Server internal error." });
          }

          const prices = pricesResult.map((row) => ({
            price_id: row.price_id,
            category: row.category,
            price: row.price,
          }));

          return res.status(200).json({
            showtimeDetails: {
              start_time: showtimeDetails.start_time,
              end_time: showtimeDetails.end_time,
              movie_title: showtimeDetails.movie_title,
              hall_name: showtimeDetails.hall_name,
            },
            prices: prices,
          });
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server internal error." });
  }
};

module.exports = { makeReservation, getReservedSeats, getShowtimeDetails };
