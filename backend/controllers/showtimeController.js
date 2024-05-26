const sql = require('msnodesqlv8');
const Showtime = require('../models/Showtime');

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
                return res.status(500).json({ error: "Server internal error." });
            } else {
                return res.status(201).json({ msg: "Showtime added successfully." });
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Server internal error." });
    }
};

const getShowtimesWithMoviesAndHalls = async (req, res) => {
    const getShowtimesQuery = `
        SELECT 
            s.start_time, s.end_time, 
            m.title AS movie_title, 
            h.name AS hall_name
        FROM Tbl_Showtimes s
        JOIN Tbl_Movies m ON s.movie_id = m.movie_id
        JOIN Tbl_Halls h ON s.hall_id = h.hall_id
    `;

    try {
        sql.query(connectionString, getShowtimesQuery, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Server internal error." });
            } else {
                return res.status(200).json(result);
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Server internal error." });
    }
};

const listShowtimes = async (req, res) => {
    const getShowtimesQuery = `
        SELECT * FROM Tbl_Showtimes
    `;

    try {
        sql.query(connectionString, getShowtimesQuery, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Server internal error." });
            } else {
                return res.status(200).json(result);
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Server internal error." });
    }
};

const getMoviesByHall = async (req, res) => {
    const { hall_id } = req.params;
    const getMoviesQuery = `
        SELECT 
            s.start_time, s.end_time, 
            m.title AS movie_title
        FROM Tbl_Showtimes s
        JOIN Tbl_Movies m ON s.movie_id = m.movie_id
        WHERE s.hall_id = ?
    `;

    try {
        sql.query(connectionString, getMoviesQuery, [hall_id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Server internal error." });
            } else {
                return res.status(200).json(result);
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Server internal error." });
    }
};

const getShowtimesByMovie = async (req, res) => {
    const { movie_id } = req.params;
    const getShowtimesQuery = `
        SELECT 
            s.start_time, s.end_time, 
            h.name AS hall_name, showtime_id
        FROM Tbl_Showtimes s
        JOIN Tbl_Halls h ON s.hall_id = h.hall_id
        WHERE s.movie_id = ?
    `;

    try {
        sql.query(connectionString, getShowtimesQuery, [movie_id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Server internal error." });
            } else {
                return res.status(200).json(result);
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Server internal error." });
    }
};

module.exports = { addShowtime, listShowtimes,getShowtimesWithMoviesAndHalls, getMoviesByHall, getShowtimesByMovie };
