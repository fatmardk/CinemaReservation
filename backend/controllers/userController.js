const sql = require("msnodesqlv8");
const { hashedPassword, comparePassword, createToken } = require("../services/authService");

const server = "LAPTOP-EJE4K8T5\\SQLEXPRESS";
const database = "SinemaRezervasyon";
const userName = "LAPTOP-EJE4K8T5\\USER";
const connectionString = `Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;

const register = async (req, res) => {
  const { username, password } = req.body;
  const checkUserQuery = `SELECT COUNT(*) AS userCount FROM Tbl_Users WHERE username = ?`;

  try {
    sql.query(connectionString, checkUserQuery, [username], async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Server internal error." });
      } else {
        const userCount = result[0].userCount;
        if (userCount > 0) {
          return res.status(400).json({ error: "User already exists." });
        } else {
          const hashed = await hashedPassword(password);
          const insertUserQuery = `
            INSERT INTO Tbl_Users (username, password)
            VALUES (?, ?)
          `;

          sql.query(connectionString, insertUserQuery, [username, hashed], async (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: "Server internal error." });
            } else {
              const getUserQuery = `SELECT user_id FROM Tbl_Users WHERE username = ?`;
              sql.query(connectionString, getUserQuery, [username], async (err, result) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({ error: "Server internal error." });
                } else {
                  const newUser = result[0];
                  const token = await createToken({
                    _id: newUser.user_id,
                    name: username,
                  });

                  return res.status(201).json({ msg: "User added successfully.", token });
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
  const userQuery = `SELECT user_id, username, password FROM Tbl_Users WHERE username = ?`;

  try {
    sql.query(connectionString, userQuery, [username], async (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Server internal error!" });
      }

      if (rows.length > 0) {
        const user = rows[0];

        if (await comparePassword(password, user.password)) {
          const token = await createToken({
            _id: user.user_id,
            name: user.username,
          });

          return res.status(200).json({ token });
        } else {
          return res.status(400).json({ error: "Password not matched. Login Failure!" });
        }
      } else {
        return res.status(400).json({ error: `${username} is not found!` });
      }
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Server internal error!" });
  }
};

module.exports = { register, login };
