var bcrypt = require("bcrypt");

var User = require('../models/user.js');

var resetPasswordController = {

  // NOW THE USER CLICKED ON THE EMAIL SENT TO HIM AND OPENED THE PAGE AND POSTED HIS DESIRED NEW PASSWORD
  resetPassword : function (req, res) {
    // EXTRACTING THE TOKEN FROM THE URL
    var token = req.query.t;
    // FIND A USERNAME WITH A RESET PASSWORD TOKEN EQUAL THE ONE SENT WITH THE REQUEST

    // CHECKING IF THERE IS A USER THAT WAS GIVEN THIS TOKEN AND THAT THE TOKEN IS NOT EXPIRED
    User.findOne({resetToken: token}, function(err, foundUser) {
      if(err) throw err;
       else {
        if(foundUser) {
          
          var curData = new Date();
          // HASH THE NEW PASSWORD
          bcrypt.genSalt(10,function(err, salt) {
            if(err) throw err;
            bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
              if(err) throw err;
              // UPDATE THE USER'S PASSWORD IF THE TOKEN IS NOT EXPIRED
              User.update({username:foundUser.username, resetTokenExpiryDate : {$gt : curData}}, {$set: {password: hash}}, function(err){});
            });
          });

        } else res.json({success: false, message: "Wrong Email"});
      }
    });

  }
}


module.exports = resetPasswordController;
