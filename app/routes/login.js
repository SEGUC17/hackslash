var bcrypt = require('bcrypt'); // BCRYPT FOR PASSWORD ENCRYPTION
var jwt    = require('jsonwebtoken'); // CREATE , SIGN IN AND VERIFY TOKEN
var express = require('express');
var router = express.Router();

// REQUIRE USER MODEL
var User = require('../models/user.js');

/* function to validate the format of the entered username (or email) and password of
the user to login */
router.post('/login', function(req, res) {
  // CHECK IF GIVEN IS USERNAME
  User.findOne({ username: req.body.username }, function(err, user) {
    if(user){ // this correct a username
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(result){
          var token = jwt.sign(user, req.app.get('superSecret'), { expiresIn : 60*60*24 }); // expires in 24 hours
          res.json({  success: true,  message: 'Enjoy your token!',  token: token  });
        }
        else res.json({ success: false, message: 'Login failed. Wrong  Password.' }); // right username and wrong password
      });
    }
    else { // NOT USERNAME
      User.findOne({email: req.body.username}, function(err, user){
        if(user){ // this correct a username
          bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(result){
              var token = jwt.sign(user, req.app.get('superSecret'), { expiresIn : 60*60*24 }); // expires in 24 hours
              res.json({  success: true,  message: 'Enjoy your token!',  token: token  });
            }
            else res.json({ success: false, message: 'Login failed. Wrong  Password.' }); // right username and wrong password
          });
        }
        else
        res.json({ success: false, message: 'Login Username of Email.' }); // right username and wrong password
      });
    }
  });
});

module.exports = router;
