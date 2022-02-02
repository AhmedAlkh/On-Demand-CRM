const mysql = require("mysql2");

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
    connection.query('SELECT * FROM customers', (err, rows) => {
        connection.release();
        if (!err) {
            res.render('home', { rows });
        } else {
            console.log(err);
        }

        console.log('Data from user table: \n', rows);
    });
  });
};

// search user
exports.find = function(req,res)
{
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log("Connected as ID " + connection.threadId);

    let searchIt = req.body.search;

    // User connection
    connection.query('SELECT * FROM customers WHERE customers.id LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR industry LIKE ? OR job_title LIKE ? OR website LIKE ? OR email LIKE ? OR phone_number LIKE ? OR instagram LIKE? OR linkedin LIKE ? OR notes LIKE ?', ['%' + searchIt + '%','%' + searchIt + '%','%' + searchIt + '%','%' + searchIt + '%','%' + searchIt + '%','%' + searchIt + '%','%' + searchIt + '%','%' + searchIt + '%','%' + searchIt + '%','%' + searchIt + '%','%' + searchIt + '%','%' + searchIt + '%'], (err, rows) => {
        connection.release();
        if (!err) {
            res.render('index', { rows });
        } else {
            console.log(err);
        }

        console.log('Data from customers: \n', rows);
    });
  });
};

// Adding new users
exports.form = function(req,res)
{
  res.render('addUser');
};