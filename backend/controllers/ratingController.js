const sql = require("msnodesqlv8");
const server = "bomch4nte\\SQLEXPRESS";
const database = "MovieApp";
const userName = "bomch4nte\\Murat";
const connectionString = `Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;

const addRating = async (req, res) => {
    const { userId, movieId, rating } = req.body;
    const insertRatingQuery = `
        INSERT INTO Ratings (UserID, MovieID, RatingValue)
        VALUES (${userId}, ${movieId}, ${rating})
    `;

    try {
        sql.query(connectionString, insertRatingQuery, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Server internal error." });
            } else {
                res.status(201).json({ msg: 'Rating added successfully.' });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server internal error." });
    }
};

const fetchRatingsByMovieId = async (req, res) => {
    const { movieId } = req.params;
    const queryStr = `SELECT * FROM Ratings WHERE MovieID = ${movieId}`;

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

const deleteRating = async (req, res) => {
    const { id } = req.params;
    const queryStr = `DELETE FROM Ratings WHERE RatingID = ${id}`;

    try {
        sql.query(connectionString, queryStr, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Server internal error." });
            } else if (result.affectedRows > 0) {
                res.status(200).json({ msg: 'Rating deleted successfully.' });
            } else {
                res.status(400).json({ error: 'Rating not found.' });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server internal error." });
    }
};

module.exports = { addRating, fetchRatingsByMovieId, deleteRating };
