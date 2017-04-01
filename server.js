//Requiring dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var DB_URI = "mongodb://localhost:27017/pets";
var path = require('path');
var router = require('./app/routes');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//Conecting to the Database.
mongoose.connect(DB_URI, function(err, db)
{
    if (!err) {
        console.log("We're Connected");
    } else {
        console.log("There is an Error");
    }
});
app.use(router);

//Starting the server on port 8080
app.listen(8080, function()
{
    console.log('Server started in 8080');
});
