const sql = require('msnodesqlv8');

const server = "LAPTOP-EJE4K8T5\\SQLEXPRESS";
const database = "SinemaRezervasyon";
const userName = "LAPTOP-EJE4K8T5\\USER";
const connectionString = `Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;


const addMovie = async (req, res) => {
    const { title, summary, duration, director, genre } = req.body;
    const insertMovieQuery = `
        INSERT INTO Tbl_Movies (title, summary, duration, director, genre)
        VALUES (?, ?, ?, ?, ?)
    `;

    try {
        sql.query(connectionString, insertMovieQuery, [title, summary, duration, director, genre], (err, result) => {
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

const listMovies = async (req, res) => {
    const listMoviesQuery = `SELECT * FROM Tbl_Movies`;

    try {
        sql.query(connectionString, listMoviesQuery, (err, rows) => {
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

const updateMovie = async (req, res) => {
    const {id} = req.params;
    const { title, summary, duration, director, genre } = req.body;
    const updateMovieQuery = `
        UPDATE Tbl_Movies
        SET title = ?, summary = ?, duration = ?, director = ?, genre = ?
        WHERE movie_id = ?
    `;

    try {
        sql.query(connectionString, updateMovieQuery, [title, summary, duration, director, genre, id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Server internal error." });
            } else {
                res.status(200).json({ msg: 'Movie updated successfully.' });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server internal error." });
    }
};

const deleteMovie = async (req, res) => {
    const { id } = req.params;
    const deleteMovieQuery = `
        DELETE FROM Tbl_Movies WHERE movie_id = ?
    `;

    try {
        sql.query(connectionString, deleteMovieQuery, [id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Server internal error." });
            } else {
                res.status(200).json({ msg: 'Movie deleted successfully.' });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server internal error." });
    }
};

const fetchById = async (req, res) => {
    const { id } = req.params;
    const fetchMovieQuery = `
        SELECT * FROM Tbl_Movies WHERE movie_id = ?
    `;

    try {
        sql.query(connectionString, fetchMovieQuery, [id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Server internal error." });
            } else if (result.length === 0) {
                res.status(404).json({ msg: 'Movie not found.' });
            } else {
                res.status(200).json(result[0]);
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server internal error." });
    }
};


module.exports = {
    addMovie,
    listMovies,
    updateMovie,
    deleteMovie,
    fetchById
};