const mysql = require("mysql2");

// Connection Pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// View customers
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

// search customers
exports.find = function(req,res)
{
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log("Connected as ID " + connection.threadId);

    let searchIt = req.body.search;

    // Customers connection
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

// Adding new customers
exports.form = function(req,res)
{
  res.render('addUser');
};

// Edit customers
exports.edit = (req,res) => {

  pool.getConnection((err, connection) => {
    if(err) throw err; // not connected
    console.log('Connected as ID ' + connection.threadId);
      // User connection
      connection.query('SELECT * FROM customers WHERE id = ?', [req.params.id], (err, rows) => {
        connection.release();
        if (!err) {
            res.render('editUser', { rows });
        } else {
            console.log(err);
        }

        console.log('Data from customers table: \n', rows);
    });
  });
}

// Update customers
exports.update = (req,res) => {
const { first_name, last_name, industry, job_title, website, email, phone_number, instagram, linkedin, notes } = req.body;

  pool.getConnection((err, connection) => {
    if(err) throw err; // not connected
    console.log('Connected as ID ' + connection.threadId);
      // Customer connection
      connection.query('UPDATE customners SET first_name = ?, last_name = ?, industry =?, job_title = ?, website = ?, email = ?, phone_number = ?, instagram = ?, linkedin = ?, notes = ? WHERE id = ?', [first_name, last_name, industry, job_title, website, email, phone_number, instagram, linkedin, notes, req.params.id], (err, rows) => {
        connection.release();
        if (!err) {
          pool.getConnection((err, connection) => {
            if(err) throw err; // not connected
            console.log('Connected as ID ' + connection.threadId);
              // User connection
              connection.query('SELECT * FROM customers WHERE id = ?', [req.params.id], (err, rows) => {
                connection.release();
                if (!err) {
                    res.render('editUser', { rows, alert: `${first_name} has been updated`});
                } else {
                    console.log(err);
                }
        
                console.log('Data from customers table: \n', rows);
            });
          });

        } else {
            console.log(err);
        }

        console.log('Data from customers table: \n', rows);
    });
  });
}

// Delete Customers
exports.delete = (req,res) => {

  pool.getConnection((err, connection) => {
    if(err) throw err; // not connected
    console.log('Connected as ID ' + connection.threadId);
      // User connection
      connection.query('DELETE FROM customers WHERE id = ?', [req.params.id], (err, rows) => {
        connection.release();
        if (!err) {
            res.reqirect('/');
        } else {
            console.log(err);
        }

        console.log('Data from customers table: \n', rows);
    });
  });
}