const sql = require("msnodesqlv8");

const server = "bomch4nte\\SQLEXPRESS";
const database = "MovieApp";
const userName = "bomch4nte\\Murat";
const connectionString = `Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;

const addMovie = async (req, res) => {
    const { name, duration, genre, director, leadActors, country } = req.body;
    const insertMovieQuery = `
        INSERT INTO Movies (MovieName, Duration, Genre, Director, LeadActors, ProductionCountry)
        VALUES ('${name}', ${duration}, '${genre}', '${director}', '${leadActors}', '${country}')
    `;

    try {
        sql.query(connectionString, insertMovieQuery, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Server internal error." });
            } else {
                res.status(201).json({ msg: 'Movie added successfully.' });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server internal error." });
    }
};

const fetchMovieById = async (req, res) => {
    const { id } = req.params;
    const queryStr = `SELECT * FROM Movies WHERE MovieID = ${id}`;

    try {
        sql.query(connectionString, queryStr, (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Server internal error." });
            } else if (rows.length > 0) {
                res.status(200).json(rows[0]);
            } else {
                res.status(400).json({ error: 'Movie not found.' });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server internal error." });
    }
};

const getAllMovies = async (req, res) => {
    const queryStr = `SELECT * FROM Movies`;

    try {
        sql.query(connectionString, queryStr, (err, rows) => {
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

const deleteMovie = async (req, res) => {
    const { id } = req.params;
    const queryStr = `DELETE FROM Movies WHERE MovieID = ${id}`;

    try {
        sql.query(connectionString, queryStr, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Server internal error." });
            } else if (result.affectedRows > 0) {
                res.status(200).json({ msg: 'Movie deleted successfully.' });
            } else {
                res.status(400).json({ error: 'Movie not found.' });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server internal error." });
    }
};

module.exports = { addMovie, fetchMovieById, getAllMovies, deleteMovie };
