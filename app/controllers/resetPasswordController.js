var User = require('../models/user.js');

var resetPasswordController = {
  resetPassword : function (req, res) {
    var token = req.query.t;
    // FIND A USERNAME WITH A RESET PASSWORD TOKEN EQUAL THE ONE SENT WITH THE REQUEST
    User.findOne({'resetToken.token': token}, function(err, foundUser){
      if(err){
        throw err;
      } else {
        if(foundUser){
          // IF FOUND : UPDATE HIS PASSWORD WITH THE PASSWORD SENT IN THE BODY
          var curData = new Date();
          User.update({username:foundUser.username, 'resetToken.expires' : {$gt : curData}}, {$set: {password: req.body.password}}, function(err){});
        } else {
          res.json({success: false, message: "Wrong Email"})
        }
      }
    });
  }
}


module.exports = resetPasswordController;
