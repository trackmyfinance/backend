const mysql = require('mysql2/promise');
const dbconfig = {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
const db = mysql.createPool(dbconfig);

module.exports = db;
