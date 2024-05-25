const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
    const sql = require("msnodesqlv8");

// Replace the following parameters with your actual database information.
const server = "bomch4nte\\SQLEXPRESS";
const database = "MovieApp";
const userName = "bomch4nte\\Murat";
const password = "";

const connectionString = `Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server}`;

const queryStr = "SELECT * FROM [dbo].[Users]";

const run = async (queryStr) => {

    const respp = sql.query(connectionString, queryStr, (err, rows) => {
        if (err) {
            console.log(err);
            throw err;
        } else if (rows) {
            console.log(rows);
            return rows;
        } else {
            console.log("nothing here");
            return;
        }
    });


};

run(queryStr);
