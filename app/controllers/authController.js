var mongoose = require('mongoose');
var bcrypt = require('bcrypt'); // BCRYPT FOR PASSWORD ENCRYPTION
var jwt = require('jsonwebtoken'); // CREATE , SIGN IN AND VERIFY TOKEN

// REQUIRE USER MODEL
var User = require('../models/user.js');

// REQUIRE MIDDLEWARE
var middleware = require("../middleware");

var authController = {
    // Logut Controller
    logout: function(req, res) {
        // CHECK IF GIVEN IS USERNAME
        var token = req.body.token;
        if (token) { //
            res.json({ success: true, message: 'Logged Out Successfully', token: null });
        } else { // there is no token
            res.json({ success: false, message: 'Not Logged in' });
        }
    },
    login: function(req, res) {

        console.log(req.body.username);
        // CHECK IF GIVEN IS USERNAME
        User.findOne({ username: req.body.username }, function(err, user) {
            if (user) { // this correct a username
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if (result) {
                        var token = jwt.sign(user, req.app.get('superSecret'), { expiresIn: 60 * 60 * 24 }); // expires in 24 hours
                        res.json({ success: true, message: 'Enjoy your token!', token: token, email: user.email, username: user.username });
                    } else {
                        res.json({ success: false, message: 'Login failed. Wrong  Password.' }); // right username and wrong password
                    }
                });
            } else { // NOT USERNAME
                User.findOne({ email: req.body.username }, function(err, user) {
                    if (user) { // this correct a username
                        bcrypt.compare(req.body.password, user.password, function(err, result) {
                            if (result) {
                                var token = jwt.sign(user, req.app.get('superSecret'), { expiresIn: 60 * 60 * 24 }); // expires in 24 hours
                                res.json({ success: true, message: 'Enjoy your token!', token: token });
                            } else {
                                res.json({ success: false, message: 'Login failed. Wrong  Password.' }); // right username and wrong password
                            }
                        });
                    } else {
                        res.json({ success: false, message: 'Login Username of Email.' }); // right username and wrong password
                    }
                });
            }
        });
    }
}

module.exports = authController;