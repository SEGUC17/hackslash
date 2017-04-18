var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

// Require Middleware
var middleware = require("../middleware");

// Requiring Controllers
var authController            = require('../controllers/authController');
var forgetPasswordController  = require('../controllers/forgetPasswordController.js');
var resetPasswordController   = require('../controllers/resetPasswordController.js');
/*
http://localhost:8080/resetPassword?t=zbeWIkT30TkdAvjh37arekyXif8LQACH
 http://localhost:8080/resetPassword/eYct52DWSdluoMazgfnFClA24OGbaJyl
*/
router.get('/resetPassword/:token', function(req, res){
  console.log("entered at point new reset x12");
  User.findOne({resetToken:req.params.token, resetTokenExpiryDate: { $gt: Date.now() } }, function(err, user) {
    if (!user) {// if user  token wasnt found redirect to the forgot password page
        console.log("entered if");
      return res.redirect('/forgotPassword');

    }else{ // if the user was found redirect to the reset password page
      console.log("enterd the else ");

      res.render('reset', {
           user: req.user,
           token:req.params.token
         });

  }
  });

});

router.get('/forgetPassword', function(req, res){
  // Here : we should render the page that asks the user for his email.
});
// After the user enters his email
router.post('/forgetPassword', forgetPasswordController.forgetPassword);

router.post('/resetPassword', resetPasswordController.resetPassword);
/* function to validate the format of the entered username (or email) and password of
the user to logout */
router.post('/logout',middleware.isLoggedIn, authController.logout);
/* function to validate the format of the entered username (or email) and password of
the user to login */
router.post('/login', authController.login) ;

module.exports = router;
