const sql = require("msnodesqlv8");

const server = "bomch4nte\\SQLEXPRESS";
const database = "MovieApp";
const userName = "bomch4nte\\Murat";
const connectionString = `Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;

const addComment = async (req, res) => {
    const { userId, movieId, comment } = req.body;
    const insertCommentQuery = `
        INSERT INTO Comments (UserID, MovieID, CommentText)
        VALUES (${userId}, ${movieId}, '${comment}')
    `;

    try {
        sql.query(connectionString, insertCommentQuery, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Server internal error." });
            } else {
                res.status(201).json({ msg: 'Comment added successfully.' });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server internal error." });
    }
};

const fetchCommentsByMovieId = async (req, res) => {
    const { movieId } = req.params;
    const queryStr = `SELECT * FROM Comments WHERE MovieID = ${movieId}`;

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

const deleteComment = async (req, res) => {
    const { id } = req.params;
    const queryStr = `DELETE FROM Comments WHERE CommentID = ${id}`;

    try {
        sql.query(connectionString, queryStr, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Server internal error." });
            } else if (result.affectedRows > 0) {
                res.status(200).json({ msg: 'Comment deleted successfully.' });
            } else {
                res.status(400).json({ error: 'Comment not found.' });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server internal error." });
    }
};

module.exports = { addComment, fetchCommentsByMovieId, deleteComment };
