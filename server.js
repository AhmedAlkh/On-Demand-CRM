//Setting up an express server//
const express = require('express');
//Listening to all of the dependencies//
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

//Passing middleware//

//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header mathes the type option//
app.use(bodyParser.urlencoded({ extended: false }));

//To use json//
app.use(bodyParser.json());


//To set up static files//
app.use(express.static('public'));

// To set up handlebars//
app.engine('hbs', exphbs( {extname: '.hbs' }));
//To view//
app.set('view engine', 'hbs');

//Router//
app.get('', (req, res) => {
      res.render('index');
})


//Sets up the Express App//
const app = express();
//Port to listen//
const port = process.env.PORT || 3001;

// Starts the server to begin listening//

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });