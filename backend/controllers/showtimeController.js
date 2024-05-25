const sql = require('msnodesqlv8');

const server = "LAPTOP-EJE4K8T5\\SQLEXPRESS";
const database = "SinemaRezervasyon";
const userName = "LAPTOP-EJE4K8T5\\USER";
const connectionString = `Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;

const addShowtime = async (req, res) => {
    const { movie_id, hall_id, start_time, end_time } = req.body;
    const insertShowtimeQuery = `
        INSERT INTO Tbl_Showtimes (movie_id, hall_id, start_time, end_time)
        VALUES (?, ?, ?, ?)
    `;

    try {
        sql.query(connectionString, insertShowtimeQuery, [movie_id, hall_id, start_time, end_time], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Server internal error." });
            } else {
                res.status(201).json({ msg: 'Showtime added successfully.' });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server internal error." });
    }
};

const listShowtimes = async (req, res) => {
    const listShowtimesQuery = `
        SELECT st.showtime_id, m.title, h.name as hall_name, st.start_time, st.end_time
        FROM Tbl_Showtimes st
        JOIN Tbl_Movies m ON st.movie_id = m.movie_id
        JOIN Tbl_Halls h ON st.hall_id = h.hall_id
    `;

    try {
        sql.query(connectionString, listShowtimesQuery, (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Server internal error." });
            } else {
                res.status(200).json(rows);
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server internal error." });
    }
};

module.exports = { addShowtime, listShowtimes };
