const sql = require('msnodesqlv8');
const { comparePassword, createToken } = require('../services/authService');

const server = "bomch4nte\\SQLEXPRESS";
const database = "MovieApp";
const userName = "bomch4nte\\Murat";
const connectionString = `Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;

const register = async (req, res) => {
    const { username, password, isAdmin } = req.body;
    const checkUserQuery = `SELECT COUNT(*) AS userCount FROM Users WHERE Username = ?`;

    try {
        sql.query(connectionString, checkUserQuery, [username], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Server internal error." });
            } else {
                const userCount = result[0].userCount;
                if (userCount > 0) {
                    return res.status(400).json({ error: 'User already exists.' });
                } else {
                    const hashed = await hashedPassword(password);
                    const insertUserQuery = `
                        INSERT INTO Users (Username, Password, UserRole)
                        VALUES (?, ?, ?)
                    `;
                    const userRole = isAdmin ? 1 : 0;

                    sql.query(connectionString, insertUserQuery, [username, hashed, userRole], async (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ error: "Server internal error." });
                        } else {
                            // Retrieve the newly created user ID
                            const getUserQuery = `SELECT UserID FROM Users WHERE Username = ?`;
                            sql.query(connectionString, getUserQuery, [username], async (err, result) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).json({ error: "Server internal error." });
                                } else {
                                    const newUser = result[0];
                                    const token = await createToken({ _id: newUser.UserID, name: username });

                                    return res.status(201).json({ msg: 'User added successfully.', token });
                                }
                            });
                        }
                    });
                }
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Server internal error." });
    }
};

const login = async (req, res) => {

    const { username, password } = req.body;

    try {
        const userQuery = `SELECT UserID, Username, Password, UserRole FROM Users WHERE Username = '${username}'`;
        
        sql.query(connectionString, userQuery, async (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).json("Server internal error!");
            }

            if (rows.length > 0) {
                const user = rows[0];

                if (await comparePassword(password, user.Password)) {
                    const token = await createToken({ _id: user.UserID, name: user.Username });
                    const isAdmin = user.UserRole === 1;

                    return res.status(201).json({ token, admin: isAdmin });
                } else {
                    return res.status(400).json({ errors: [{ msg: 'Password not matched. Login Failure!', path: 'password' }] });
                }
            } else {
                return res.status(400).json({ errors: [{ msg: `${username} is not found!`, path: 'username' }] });
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json("Server internal error!");
    }
};

module.exports = { login, register };
