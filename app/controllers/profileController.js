//Multer
var multer = require('multer');
var workData = multer({ dest: "public/images/profilePics" });
var type = workData.single('profilePicture');
var fs = require('fs');

//Connecting to JS defined Schema.
let user = require('../models/user');
let post = require('../models/post');

//Require Middleware
var middleware = require("../middleware");

//Requiring bcrypt
var bcrypt = require('bcrypt');

//Require updateController
var updateController = require("./updateController");

let profileController = {
    //This function takes in the user's new information, and edits it.
    editProfile: function(req, res) {


        ///handle not supported image file
        if (req.file) {
            var checkImage = req.file.originalname;
            checkImage = checkImage.substring(checkImage.length - 3, checkImage.length);
            if (checkImage != "png" && checkImage != "jpg") {
                fs.unlinkSync(req.file.path);
                res.status(403).json('you should upload an image with extension jpg or png only');
                return;
            }
        }

        if (!req.body) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(400).json('There is a problem with your request.');

            return;
        }
        var token = req.body.token || req.header("x-access-token") || req.query.token;
        if (!token) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(403).json('You must be logged in to edit your profile.')
        } else {
            //Create a new user with all the new features (The unchanged ones are null)
            let edited = new user({
                email: req.decoded._doc.email,
                username: req.body.username,
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                phoneNumber1: req.body.phoneNumber1,
                phoneNumber2: req.body.phoneNumber2,
                homeNumber: req.body.homeNumber
            });
            //For profile picture only
            if (req.file) {
                edited.profilePicture = req.file.path;
            }
            //Updating the user.
            updateController.updateProfile(edited, res);
        }
    },
    //This function takes in the desired user's email, an views all relevant information.
    viewProfile: function(req, res) {
        if (!req.body) {
            res.status(400).json('There is a problem with your request.');
            return;
        }
        var token = req.body.token || req.header("x-access-token") || req.query.token;
        if (!token) {
            res.status(400).json('You must be logged in to view profiles.')
        } else {
            //To add: if this is my profile, show edit button.
            var myEmail = req.decoded._doc.email;
            //var qUserName = req.query.username;
            //var uEmail = req.header("email");
            var uUsername = req.header("username");
            //First, find this user.
            user.findOne({ username: uUsername }, function(err, userProfileInfo) {
                if (err) { //Internal Error
                    res.status(500).json(err.message);
                } else if (userProfileInfo) { //User found.
                    var uEmail = userProfileInfo.email;
                    post.find({ ownerEmail: uEmail }, function(err, myPosts) { //Find his posts as well.
                        if (err) { //Internal Error
                            res.status(500).json(err.message);
                        } else if (myPosts.length > 0) { //View User's info and his posts.
                            var profileData = { userProfileInfo, myPosts };
                            res.status(200).json(profileData);
                        } else { //View User's info.
                            myPosts = "||&This user has no Posts yet.&||";
                            var profileData = { userProfileInfo, myPosts };
                            res.status(200).json(profileData);
                        }
                    })
                } else { //User not found. Send relevant error message.
                    res.status(400).json('The user you\'re trying to view does not exist!');
                }
            })
        }
    },
    // This function allows users to rate other users.
    rateUser: function(req, res) {
        if (!req.body) {
            res.status(400).json('There is a problem with your request.');
            return;
        }
        var token = req.body.token;
        if (!token) {
            res.status(400).json('You must be logged in.');
        } else {
            var raterEmail = req.decoded._doc.email;
            var ratedEmail = req.body.remail;
            if (ratedEmail == raterEmail) {
                res.status(300).json('You Cannot rate yourself!');
                return;
            }
            var found = false;
            user.findOne({ email: ratedEmail }, function(err, ratedFound) {
                var alreadyRated = [];
                if (ratedFound) {
                    if (ratedFound.raters) {
                        alreadyRated = ratedFound.raters;
                    }
                    for (var i = 0; i < alreadyRated.length; i++) {
                        if (alreadyRated[i] == raterEmail) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        res.status(403).json({ 'message': 'You have already rated this user.' });
                    } else {
                        user.findOne({ email: raterEmail }, function(err, raterFound) {
                            if (raterFound) {
                                var sum = 0;
                                var given = req.body.rate;
                                if (given > 5 || given < 1 || !given) {
                                    res.status(300).json('Invalid rate input, please try again');
                                    return;
                                }
                                var currentRate = ratedFound.rate;
                                sum = currentRate * alreadyRated.length;
                                sum += parseFloat(given);
                                alreadyRated.push(raterEmail);
                                var newRate = sum / alreadyRated.length;

                                let updatedRated = new user({
                                    raters: alreadyRated,
                                    rate: newRate,
                                    email: ratedEmail
                                })

                                updateController.updateProfile(updatedRated, res);
                            } else {
                                res.status(401).json('You must be logged in to rate users.');
                            }
                        })
                    }
                } else {
                    res.status(404).json('This user does not exist.');
                }
            })
        }
    },
    //This function allows the user to delete his/her profile.
    deleteUser: function(req, res) {



        if (!req.body) {
            res.status(400).json('There is a problem with your request.');
            return;
        }
        var token = req.body.token;
        if (!token) {
            res.status(400).json('You must be logged in.');
        } else {
            var uEmail = req.decoded._doc.email;
            var uPassword = req.body.password;
            var uVerify = req.body.verify;

            if (uPassword == uVerify) { //Passwords match.
                //Find user
                user.findOne({ email: uEmail }, function(err, User) {
                    if (err) {
                        res.status(500).json('internal error');
                        return;
                    }
                    if (User) { //User found. Check to see if entered password matches the saved one.
                        bcrypt.compare(uPassword, User.password, function(err, result) {
                            if (result) { //Password matched.
                                user.findOneAndRemove({ email: uEmail }, function(err) {
                                    if (err) {
                                        res.status(500).json('error');
                                    } else {
                                        post.remove({ ownerEmail: uEmail }, function(err, posts) {
                                            if (err) {
                                                res.status(400).json(err.message);
                                                return;
                                            } else {
                                                res.status(200).json({ success: true, message: 'Your profile has been deleted! D:', token: null });
                                                return;
                                            }
                                        })
                                    }
                                })
                            } else { //Password didn't match.
                                res.status(300).json('Wrong Password');
                                return;
                            }
                        });
                    } else { //User not found.
                        res.status(404).json('User does not exit');
                        return;
                    }
                })
            } else { //Password do not match.
                res.status(300).json('Passwords don\'t match.');
                return;
            }
        }
    },
    changePassword: function(req, res) {
        if (!req.body) {
            res.status(400).json('There is a problem with your request.');
            return;
        }
        var token = req.body.token;
        if (!token) {
            res.status(400).json('You must be logged in to change your password.')
        } else {
            var uEmail = req.decoded._doc.email;
            var uPassword = req.body.password;
            var uVerify = req.body.verify;
            var newPassword = req.body.newPassword;
            if (newPassword) {
                if (newPassword.length < 5) {
                    res.status(300).json('Password too short');
                    return;
                }
                if (uPassword == uVerify) { //Passwords match.
                    //Find user
                    user.findOne({ email: uEmail }, function(err, User) {
                        if (err) {
                            res.status(500).json('internal error');
                            return;
                        }
                        if (User) { //User found. Check to see if entered password matches the saved one.
                            bcrypt.compare(uPassword, User.password, function(err, result) {
                                if (result) { //Password matched.
                                    bcrypt.genSalt(10, function(err, salt) {
                                        if (err) {
                                            throw err;
                                        }
                                        //Hash the new password.
                                        bcrypt.hash(newPassword, salt, function(err, hash) {
                                            //Create a new user and update him.
                                            let edited = new user({
                                                email: uEmail,
                                                password: hash
                                            });
                                            updateController.updateProfile(edited, res);
                                        });
                                    });
                                } else { //Password didn't match.
                                    res.status(300).json('Wrong Password');
                                }
                            });
                        } else { //User not found.
                            res.status(404).json('User does not exit');
                        }
                    })
                } else { //Password do not match.
                    res.status(300).json('Passwords don\'t match.');
                }
            } else {
                res.status(300).json('Please enter a new password and try again.');
            }
        }
    }

}

//Export for the rest of the project.
module.exports = profileController;
