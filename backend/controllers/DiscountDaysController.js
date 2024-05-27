const sql = require('msnodesqlv8');
const DiscountDays = require('../models/DiscountDays');

const server = "LAPTOP-EJE4K8T5\\SQLEXPRESS";
const database = "SinemaRezervasyon";
const userName = "LAPTOP-EJE4K8T5\\USER";
const connectionString = `Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;

const getAllDiscountDays = async (req, res) => {
    const query = `SELECT day_of_week FROM Table_DiscountDays`;

    try {
        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                console.error("Error fetching discount days:", err);
                res.status(500).json({ error: "Server internal error." });
            } else {
                const discountDays = rows.map(row => new DiscountDays(row.day_of_week));
                res.status(200).json(discountDays);
            }
        });
    } catch (error) {
        console.error("Error fetching discount days:", error.message);
        res.status(500).json({ error: "Server internal error." });
    }
};

module.exports = {
    getAllDiscountDays
};
