var express = require('express');
var router = express.Router();

// REQUIRE MIDDLEWARE
var middleware = require("../middleware");

// Requiring Controller
var authController = require('../controllers/authController');

/* function to validate the format of the entered username (or email) and password of
the user to login */
router.post('/logout',middleware.isLoggedIn, authController.logout);

/* function to validate the format of the entered username (or email) and password of
the user to login */
router.post('/login', authController.login) ;

module.exports = router;
