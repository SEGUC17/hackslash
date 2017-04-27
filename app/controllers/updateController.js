//Connecting to JS defined Schema.
let User = require('../models/user');


//require file system for editing profile picture
var fs = require('fs');

let updateController = {
    //This function updates all the User's info in the database if it is changed.
    updateProfile: function(user, res) {
        var uEmail = user.email;
        //First, find this user in the database.
        User.findOne({ email: uEmail }, function(err, foundUser) {
            if (err) {
                //Internal Error
                res.status(500).json(err.message);
            } else {
                //User found. Check all given parameters, if given, change it.
                if (foundUser) {
                    if (user.username) {
                        foundUser.username = user.username;
                    }
                    if (user.password) {
                        foundUser.password = user.password;
                    }
                    if (user.firstName) {
                        foundUser.firstName = user.firstName;
                    }
                    if (user.middleName) {
                        foundUser.middleName = user.middleName;
                    }
                    if (user.lastName) {
                        foundUser.lastName = user.lastName;
                    }
                    if (user.phoneNumber1) {
                        foundUser.phoneNumber1 = user.phoneNumber1;
                    }
                    if (user.phoneNumber2) {
                        foundUser.phoneNumber2 = user.phoneNumber2;
                    }
                    if (user.homeNumber) {
                        foundUser.homeNumber = user.homeNumber;
                    }
                    if (user.profilePicture) {
                        //check to prevent deletion of the default profile picture
                        var defaultProfilePic = "public/images/default.jpg"
                        if (defaultProfilePic != foundUser.profilePicture)
                            fs.unlinkSync(foundUser.profilePicture);
                        foundUser.profilePicture = user.profilePicture;
                    }
                    if (user.rate && user.rate > 0) {
                        foundUser.rate = user.rate;
                    }
                    if (user.count) {
                        foundUser.count = user.count;
                    }
                    if (user.raters && user.raters.length > 0) {
                        foundUser.raters = user.raters;
                    }
                    foundUser.save(function(err, updatedUser) { //Save the changes.
                        if (err) {
                            console.log('hi');
                            res.status(403).json('this username is already taken by another user.');
                        } else {
                            res.status(200).json(updatedUser);
                        }
                    })
                } else {
                    //User not found. Send relevent error message.
                    res.status(403).json('Cannot update non-existent user.');
                }
            }
        })
    }
}

//Export for the rest of the project.
module.exports = updateController;