var express = require('express');
var router = express.Router();

// REQUIRE MIDDLEWARE
var middleware = require("../middleware");

// Requiring Controllers
var authController            = require('../controllers/authController');
var forgetPasswordController  = require('../controllers/forgetPasswordController.js');
var resetPasswordController   = require('../controllers/resetPasswordController.js');


router.get('/forgetPassword', function(req, res) { // HERE : WE SHOULD RENDER THE PAGE THAT ASKS FOR THE USER FOR HIS EMAIL});

  // AFTER THE USER ENTERS HIS EMAIL
router.post('/forgetPassword', forgetPasswordController.forgetPassword);

// REQUIRE REGISTER CONTROLLER

router.get('/resetPassword', function(req, res) {
   // HERE : WE SHOULD RENDER THE PAGE THAT ASKS FOR A NEW PASSWORD
});

router.post('/resetPassword', resetPasswordController.resetPassword);

/* function to validate the format of the entered username (or email) and password of
the user to login */
router.post('/logout',middleware.isLoggedIn, authController.logout);

/* function to validate the format of the entered username (or email) and password of
the user to login */
router.post('/login', authController.login) ;

module.exports = router;
