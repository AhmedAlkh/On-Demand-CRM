//Setting up an express server//
const express = require('express');
//Listening to all of the dependencies//
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
//Sets up the Express App//
const app = express();
//Port to listen//
const PORT = process.env.PORT || 3001;
//declare connection for jawsDB
var connection = mysql.createConnection(process.env.JAWSDB_URL);


require('dotenv').config();

//Passing middleware//

//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header mathes the type option//
app.use(bodyParser.urlencoded({ extended: false }));

//To use json//
app.use(bodyParser.json());


//To set up static files//
app.use(express.static('public'));

// To set up handlebars//
app.engine('hbs', exphbs.engine({extname: '.hbs' }));
//To view//
app.set('view engine', 'hbs');

//create a connection pool
const pool = mysql.createPool({
      uri: process.env.JAWSDB_URL
      })
//connect to the database
pool.getConnection((error, connection) => {
      if(error) throw error;
      console.log('connected to the database');
})

//Router//
app.get('', (req, res) => {
      res.render('index');
})

// Tell app where routes are
const routes = require('./server/models/user');
app.use('/', routes);

// Starts the server to begin listening//

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });