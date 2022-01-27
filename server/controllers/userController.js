const mysql = require('mysql');

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect to DB
pool.getConnection((err, connection) => {
    if(err) throw err; // not connected!
    console.log('Connected as ID ' + connection.threadId);
});

// View users
exports.view = (req, res) => {
    res.render('home');
}