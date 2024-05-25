// // // const sql = require('msnodesqlv8');
// // const sql = require('mssql');

// // require('dotenv').config();

// // const server = process.env.DB_SERVER;
// // const database = process.env.DB_NAME;
// // const userName = process.env.DB_USER;

// // const dbConfig = {
// //     driver: 'msnodesqlv8',
// //     connectionString: `Driver={ODBC Driver 17 for SQL Server};Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;`
// // };

// // const connect = async () => {
// //     try {
// //         let pool = await sql.connect(dbConfig);
// //         return pool;
// //     } catch (err) {
// //         console.log('Database connection failed! Bad config: ', err);
// //     }
// // };

// // module.exports = connect;



// const sql = require('mssql');
// require('dotenv').config();

// const server = process.env.DB_SERVER;
// const database = process.env.DB_NAME;
// const userName = process.env.DB_USER;

// const connectionString = `Driver={ODBC Driver 17 for SQL Server};Server=${server};Database=${database};UID=${userName};Trusted_Connection=yes;`;

// const dbConfig = {
//     connectionString: connectionString,
//     driver: 'msnodesqlv8'
// };

// const connect = async () => {
//     try {
//         let pool = await sql.connect(dbConfig);
//         return pool;
//     } catch (err) {
//         console.log('Database connection failed! Bad config: ', err);
//     }
// };

// module.exports = connect;


const odbc = require('odbc');
require('dotenv').config();

const connectionString = `Driver={ODBC Driver 17 for SQL Server};Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};UID=${process.env.DB_USER};Trusted_Connection=yes;`;

const connect = async () => {
    try {
        const connection = await odbc.connect(connectionString);
        return connection;
    } catch (err) {
        console.log('Database connection failed! Bad config: ', err);
    }
};

module.exports = connect;
