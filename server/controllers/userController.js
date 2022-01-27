const mysql = require("mysql");

// Connection Pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// View users
exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log("Connected as ID " + connection.threadId);

    // User connection
    connection.query('SELECT * FROM user', (err, rows) => {
        connection.release();
        if (!err) {
            res.render('home');
        } else {
            console.log(err);
        }
    });
  });
};
