var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
var User = require('../models/user.js');

var resetPasswordController = {

    // NOW THE USER CLICKED ON THE EMAIL SENT TO HIM AND OPENED THE PAGE AND POSTED HIS DESIRED NEW PASSWORD
    resetPassword: function(req, res) {
        // EXTRACTING THE TOKEN AND PASSWORD FROM THE INCOMING PARAMETERS

        var tokenSource = req.body.params.token;
        var tokenToGo = tokenSource.token; // EXTRACTING THE TOKEN VALUE ITSELF

        var passSource = req.body.params.password;
        var passToGo = passSource.password; // EXTRACTING THE PASSWORD VALUE ITSELF
        if (passToGo.length < 5) {
            res.status(400).json("password is too short");
            return;
        }

        // FIND A USERNAME WITH A RESET PASSWORD TOKEN EQUAL THE ONE SENT WITH THE REQUEST

        // CHECKING IF THERE IS A USER THAT WAS GIVEN THIS TOKEN AND THAT THE TOKEN IS NOT EXPIRED
        User.findOne({ resetToken: tokenToGo }, function(err, foundUser) {
            if (err) throw err;
            else {
                if (foundUser) {

                    var curData = new Date();
                    // HASH THE NEW PASSWORD
                    bcrypt.genSalt(10, function(err, salt) {
                        if (err) throw err;
                        bcrypt.hash(passToGo, salt, function(err, hash) {
                            if (err) {
                                // throw err;
                            }
                            // UPDATE THE USER'S PASSWORD IF THE TOKEN IS NOT EXPIRED
                            else User.update({ username: foundUser.username, resetTokenExpiryDate: { $gt: curData } }, { $set: { password: hash } }, function(err) {});
                        });
                    });

                    // SEND THE USER A TOKEN TO MAKE HIM LOGGED IN
                    User.findOne({ username: foundUser.username }, function(err, user) {
                        var token = jwt.sign(user, req.app.get('superSecret'), { expiresIn: 60 * 60 * 24 }); // expires in 24 hours
                        res.json({ success: true, message: 'Enjoy your token!', token: token });
                    });

                } else res.json({ success: false, message: "Bad Token" });
            }
        });

    }
}


module.exports = resetPasswordController;