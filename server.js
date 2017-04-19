// Requiring dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');



// Requiring the Configuration file
var config = require('./app/config/config');

// Getting Database URI
var DB_URI = config.DB_URI;

// Conecting to the Database.
mongoose.connect(DB_URI, function(err, db){
    if(!err){
        console.log("We're Connected");
    }else{
        console.log("There is an Error");
    }
});

// Initializing app
var app = express();


// Using Middlewares
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('superSecret', config.superSecret); // Secret of Tokens!



// Requiring routes
var register = require('./app/routes/register');
var auth     = require('./app/routes/auth');
var client   = require('./app/routes/client');
var user     = require('./app/routes/user');
var profile  = require('./app/routes/profile');
var index    = require('./app/routes/index');

// Using routes
app.use(register);
app.use(auth);
app.use(client);
app.use(user);
app.use(profile);
app.use(index);

//Starting the server on port 8080
app.listen(8080, function(){
  console.log('Server started in 8080');
});
