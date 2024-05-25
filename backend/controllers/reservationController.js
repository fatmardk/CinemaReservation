const sql = require('msnodesqlv8');

const server = "LAPTOP-EJE4K8T5\\SQLEXPRESS";
const database = "SinemaRezervasyon";
const userName = "LAPTOP-EJE4K8T5\\USER";
const connectionString = `Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;

const makeReservation = async (req, res) => {
    const { showtime_id, customer_name, seat_number, category } = req.body;
    const checkSeatsQuery = `
        SELECT COUNT(*) AS reservedCount, h.capacity
        FROM Tbl_Reservations r
        JOIN Tbl_Showtimes st ON r.showtime_id = st.showtime_id
        JOIN Tbl_Halls h ON st.hall_id = h.hall_id
        WHERE r.showtime_id = ?
    `;
    const insertReservationQuery = `
        INSERT INTO Tbl_Reservations (showtime_id, customer_name, seat_number, category)
        VALUES (?, ?, ?, ?)
    `;

    try {
        sql.query(connectionString, checkSeatsQuery, [showtime_id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Server internal error." });
            }

            const { reservedCount, capacity } = result[0];
            if (reservedCount >= capacity) {
                return res.status(400).json({ error: "No available seats." });
            }

            sql.query(connectionString, insertReservationQuery, [showtime_id, customer_name, seat_number, category], (err, result) => {
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
