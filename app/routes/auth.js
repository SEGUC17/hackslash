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
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (user) {///< DONT FORGET SWITCH BACK TO NOT >>>>>>>>>>>>>>>>>>>>
        console.log("entered if");
      return res.redirect('/forgotPassword'); // if user wasnt found redirect to the forgot password page

    }else{
      console.log("enterd the else ");

res.redirect('/reset');
      // res.render('reset', {
      //      user: req.user
      //    });

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
