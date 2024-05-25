const { hashedPassword, createToken } = require('../services/authService');

const sql = require("msnodesqlv8");
const server = "bomch4nte\\SQLEXPRESS";
const database = "MovieApp";
const userName = "bomch4nte\\Murat";
const connectionString = `Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;

// const addUser = async (req, res) => {
//     const { username, password, isAdmin } = req.body;
//     const checkUserQuery = `SELECT COUNT(*) AS userCount FROM Users WHERE Username = '${username}'`;

//     try {
//         sql.query(connectionString, checkUserQuery, async (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).json({ error: "Server internal error." });
//             } else {
//                 const userCount = result[0].userCount;
//                 if (userCount > 0) {
//                     res.status(400).json({ error: 'User already exists.' });
//                 } else {
//                     const hashed = await hashedPassword(password);
//                     const insertUserQuery = `
//                         INSERT INTO Users (Username, Password, UserRole)
//                         VALUES ('${username}', '${hashed}', ${isAdmin ? 1 : 0})
//                     `;
//                     const token = await createToken()

//                     sql.query(connectionString, insertUserQuery, (err, result) => {
//                         if (err) {
//                             console.log(err);
//                             res.status(500).json({ error: "Server internal error." });
//                         } else {
//                             res.status(201).json({ msg: 'User added successfully.',  });
//                         }
//                     });
//                 }
//             }
//         });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ error: "Server internal error." });
//     }
// };




const fetchUserById = async (req, res) => {
    const { id } = req.params;
    const queryStr = `SELECT * FROM Users WHERE UserID = ${id}`;
    try {
        sql.query(connectionString, queryStr, (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Server internal error." });
            } else if (rows.length > 0) {
                res.status(200).json(rows[0]);
            } else {
                res.status(400).json({ error: 'User not found.' });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server internal error." });
    }
};

const getAllUsers = async (req, res) => {
    const queryStr = `SELECT * FROM Users`;
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

// const deleteUser = async (req, res) => {
//     const { id } = req.params;
//     const queryStr = `DELETE FROM Users WHERE UserID = ${id}`;
//     try {
//         sql.query(connectionString, queryStr, (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).json({ error: "Server internal error." });
//             } else if (result.affectedRows > 0) {
//                 res.status(200).json({ msg: 'User deleted successfully.' });
//             } else {
//                 res.status(400).json({ error: 'User not found.' });
//             }
//         });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ error: "Server internal error." });
//     }
// };

// const deleteUser = async (req, res) => {
//     const { id } = req.params;
//     console.log(id);
//     const queryStr = `DELETE FROM Users WHERE UserID = ?`;

//     try {
//         sql.query(connectionString, queryStr, [id], (err, result) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({ error: "Server internal error." });
//             }

//             // Check the result to determine if any row was affected
//             if (result && result.rowsAffected && result.rowsAffected[0] > 0) {
//                 return res.status(200).json({ msg: 'User deleted successfully.' });
//             } else {
//                 return res.status(400).json({ error: 'User not found.' });
//             }
//         });
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json({ error: "Server internal error." });
//     }
// };

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const queryStr = `DELETE FROM Users WHERE UserID = ?`;

    try {
        sql.query(connectionString, queryStr, [id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Server internal error." });
            }

            // Log the entire result object for debugging purposes
            console.log("SQL result:", result);

            // Check if rows were affected
            if (result && result.rowsAffected && result.rowsAffected[0] > 0) {
                return res.status(200).json({ msg: 'User deleted successfully.' });
            } else {
                return res.status(400).json({ error: 'User not found.' });
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Server internal error." });
    }
};

module.exports = { fetchUserById, getAllUsers, deleteUser };
