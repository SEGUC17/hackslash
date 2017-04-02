var bcrypt = require("bcrypt");

var User = require('../models/user.js');

var resetPasswordController = {
  resetPassword : function (req, res) {
    var token = req.query.t;
    // FIND A USERNAME WITH A RESET PASSWORD TOKEN EQUAL THE ONE SENT WITH THE REQUEST
    console.log(token);
    User.findOne({resetToken: token}, function(err, foundUser){
      if(err){
        throw err;
      } else {
        if(foundUser){
          // IF FOUND : UPDATE HIS PASSWORD WITH THE PASSWORD SENT IN THE BODY
          var curData = new Date();

          // HASH THE NEW PASSWORD
          bcrypt.genSalt(10,function(err, salt){
            if(err) throw err;
            bcrypt.hash(req.body.newPassword, salt, function(err, hash){
              if(err) throw err;
              User.update({username:foundUser.username, resetTokenExpiryDate : {$gt : curData}}, {$set: {password: hash}}, function(err){});
            });
          });

        } else {
          res.json({success: false, message: "Wrong Email"})
        }
      }
    });
  }
}


module.exports = resetPasswordController;
