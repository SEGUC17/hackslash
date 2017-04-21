var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

// Require Middleware
var middleware = require("../middleware");

// Requiring Controllers
var authController = require('../controllers/authController');
var forgetPasswordController = require('../controllers/forgetPasswordController.js');
var resetPasswordController = require('../controllers/resetPasswordController.js');


router.post('/forgetPassword', forgetPasswordController.forgetPassword);

router.post('/resetPassword', resetPasswordController.resetPassword);
/* function to validate the format of the entered username (or email) and password of
the user to logout */
router.post('/logout', middleware.isLoggedIn, authController.logout);
/* function to validate the format of the entered username (or email) and password of
the user to login */
router.post('/login', authController.login);

module.exports = router;