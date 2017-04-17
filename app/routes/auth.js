var express = require('express');
var router = express.Router();

// Require Middleware
var middleware = require("../middleware");

// Requiring Controllers
var authController            = require('../controllers/authController');
var forgetPasswordController  = require('../controllers/forgetPasswordController.js');
var resetPasswordController   = require('../controllers/resetPasswordController.js');

router.get('/forgetPassword', function(req, res){
  // Here : we should render the page that asks the user for his email.
});
// After the user enters his email
router.post('/forgetPassword', forgetPasswordController.forgetPassword);

router.get('/resetPassword', function(req, res){
    res.sendFile(path.resolve('/home/khatib/Desktop/before new master/hackslash/public/views/reset.html'));
  


});
router.post('/resetPassword', resetPasswordController.resetPassword);
/* function to validate the format of the entered username (or email) and password of
the user to logout */
router.post('/logout',middleware.isLoggedIn, authController.logout);
/* function to validate the format of the entered username (or email) and password of
the user to login */
router.post('/login', authController.login) ;

module.exports = router;
