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

module.exports = { addMovie, listMovies };
