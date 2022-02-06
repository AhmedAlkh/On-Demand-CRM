const mysql = require("mysql2");

// Connection Pool
const pool = mysql.createPool({
uri: process.env.JAWSDB_URL
})

// View users
exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log("Connected as ID " + connection.threadId);

    // User connection
    connection.query('SELECT * FROM customers', (err, rows) => {
        connection.release();
        if (!err) {
            res.render('index', { rows });
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

exports.form = function(req,res)
{
  res.render('addUser');
}

// Adding new users
exports.create = function(req,res)
{
  const { first_name, last_name, industry, job_title, website, email, phone_number, instagram, linkedin, notes } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log("Connected as ID " + connection.threadId);

    let searchIt = req.body.search;

    // User connection
    connection.query('INSERT INTO customers SET first_name = ?, last_name = ?, industry = ?, job_title = ?, website = ?, email = ?, phone_number = ?, instagram = ?, linkedin = ?, notes = ?',[first_name, last_name, industry, job_title, website, email, phone_number, instagram, linkedin, notes], (err, rows) => {
        connection.release();
        if (!err) {
            res.render('addUser');
        } else {
            console.log(err);
        }

        console.log('Data from customers: \n', rows);
    });
  });
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
      connection.query('UPDATE customers SET first_name = ?, last_name = ?, industry =?, job_title = ?, website = ?, email = ?, phone_number = ?, instagram = ?, linkedin = ?, notes = ? WHERE id = ?', [first_name, last_name, industry, job_title, website, email, phone_number, instagram, linkedin, notes, req.params.id], (err, rows) => {
        connection.release();
        if (!err) {
          pool.getConnection((err, connection) => {
            if(err) throw err; // not connected
            console.log('Connected as ID ' + connection.threadId);
              // User connection
              connection.query('SELECT * FROM customers WHERE id = ?', [req.params.id], (err, rows) => {
                connection.release();
                if (!err) {
                    res.render('edituser', { rows, alert: `${first_name} has been updated`});
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
          connection.query('SELECT * FROM customers', (err, rows) => {
            res.render('index', {rows});
          })
            
        } else {
            console.log(err);
        }

        console.log('Data from customers table: \n', rows);
    });
  });
}

// view a customers profile
exports.profile = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log("Connected as ID " + connection.threadId);

    // User connection
    connection.query('SELECT * FROM customers WHERE id = ?', [req.params.id], (err, rows) => {
        connection.release();
        if (!err) {
            res.render('viewCustomer', { rows });
        } else {
            console.log(err);
        }

        console.log('Data from user table: \n', rows);
    });
  });
};