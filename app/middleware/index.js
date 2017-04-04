var jwt    = require('jsonwebtoken'); // CREATE , SIGN IN AND VERIFY TOKEN
var express = require('express');
var router = express.Router();

let middleware = {
  //VERIFY USER LOGGED IN
  isLoggedIn: function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
      jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
        if(err){
          console.log("error in middleware isLoggedIn");
          console.log("------------------------------");
          return console.log(err);
          res.json({success: false,  message: 'You should be logged in to do that!'});
        }
        else{
            // save to request for use in other routes
            req.decoded = decoded;
            return next();
        }
      });
    }
  }
};

module.exports = middleware;