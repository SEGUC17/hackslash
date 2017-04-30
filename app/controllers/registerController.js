var bcrypt = require('bcrypt'); // BCRYPT FOR PASSWORD ENCRYPTION
var mongoose = require('mongoose');
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var nev = require('email-verification')(mongoose);
var nodemailer = require('nodemailer');
var configure = require('../config/config');

// REQUIRE USER MODEL
var User = require('../models/user.js');

//profile picture upload
var multer = require('multer');
var upload = multer({ dest: "public/images/profilePics" });
var type = upload.single('profilePic');
// file system
var fs = require('fs');

// a helper method to validate the format of an email
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/* function to validate the format of the entered username, email, password of
the user before registration */
function validateInput(username, email, password, firstName, lastName) {

    var output = {
        success: true
    };
    // Check if first name is enetered
    if (!firstName) {
        output.success = false;
        output.message = "First name in not entered"
    } else if (firstName.length < 1 || firstName.length > 30) { // Check first name lenght
        output.success = false;
        output.message = "First name length must be between 1 and 30 characters";
    }
    // Check if last name is entered
    if (!lastName) {
        output.success = false;
        output.message = "Last name in not entered"
    } else if (lastName.length < 1 || lastName.length > 30) { // Check last name lenght
        output.success = false;
        output.message = "Last name length must be between 1 and 30 characters";
    }
    // Check if username is entered
    if (!username) {
        output.success = false;
        output.message = "Username in not entered"
    } else if (username.length < 5 || username.length > 30) { // Check username lenght
        output.success = false;
        output.message = "Username length must be between 5 and 30 characters";
    }
    // Check if email is entered
    if (!email) {
        output.success = false;
        output.message = "No email entered";
    } else if (!validateEmail(email)) { // Check email format
        output.success = false;
        output.message = "Email format is not valid";
    }
    // Check if password is entered
    if (!password) {
        output.success = false;
        output.message = "No password entered";
    } else if (password.length < 5) { // Check password length
        output.success = false;
        output.message = "Password length must be at least 5 characters";
    }
    return output;
}

// =============================================================================
// Configurations for setting up email verification

// EMAIL CONFIG
// hashing password function for encryption
function myHasher(password, tempUserData, insertTempUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err)
            throw err;
        bcrypt.hash(password, salt, function(err, hash) {
            return insertTempUser(hash, tempUserData, callback);
        });
    });
};

// nod-email-verification configurations
nev.configure({

        verificationURL: 'http://35.162.12.121:8080/v/${URL}',
        URLLength: 48,
        // mongo-stuff
        persistentUserModel: User,
        tempUserCollection: 'temporary_users',
        emailFieldName: 'email',
        passwordFieldName: 'password',
        URLFieldName: 'GENERATED_VERIFYING_URL',
        expirationTime: 86400, // 24 hours

        // emailing options
        transportOptions: {
            service: 'SendGrid',
            auth: {
                user: 'apikey',
                pass: configure.sendGridAPI
            }
        },
        verifyMailOptions: {
            from: 'Do Not Reply <pettts@pettts.com>',
            subject: 'Confirm your account',
            html: '<p>Please verify your account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
                'paste the following link into your browser:</p><p>${URL}</p>',
            text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
        },

        // confirmation mail configurations
        shouldSendConfirmation: true,
        confirmMailOptions: {
            from: 'Do Not Reply <pettts@pettts.com>',
            subject: 'Successfully verified!',
            html: '<p>Your account has been successfully verified.</p>',
            text: 'Your account has been successfully verified.'
        },

        // setting hashing password function
        hashingFunction: myHasher
    },
    function(err, options) {
        if (err) {
            console.log(err);
        }
    });

// generation temporary user model
nev.generateTempUserModel(User, function(err, tempUserModel) {
    if (err) {
        console.log("error in generating temp user model");
        console.log("================");
        console.log(err);
    }
});

console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));

// nodemailer configurations, I really don't understand why I need this
// while I have transportOptions above:S
var smtpTransport = nodemailer.createTransport({
    from: 'replyemail@example.com',
    options: {
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
            user: 'apikey',
            pass: configure.sendGridAPI
        }
    }
}, function(err, result) {
    if (err) {
        console.log("error in nodemailer createTransport");
        console.log("========================");
        console.log(err);
    } else {
        console.log(result);
    }
});

// =============================================================================
// It's time for the register Controller
// =============================================================================

var registerController = {

    register: function(req, res) {

        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;


        ///handle not supported image file
        if (req.file) {
            var checkImage = req.file.originalname;
            checkImage = checkImage.substring(checkImage.length - 3, checkImage.length);
            if (checkImage != "png" && checkImage != "jpg") {
                fs.unlinkSync(req.file.path);
                res.status(403).json({ success: false, message: "you should upload an image with extension jpg or png only" });
                return;
            }
        }
        // validating the format of username, email, and password
        var validatedInput = validateInput(username, email, password, firstName, lastName);
        //path for default profile pic or the uploaded pic if exists
        var profilePicPath = "public/images/default.jpg";
        if (req.file)
            profilePicPath = req.file.path;
        // if the validation respone is false
        if (validatedInput.success == false) {
            // send the validation message specified in the function
            if (req.file)
                fs.unlinkSync(req.file.path);
            res.status(400).json(validatedInput);
        } else {
            // checking if the entered username/email already exists in the database

            User.findOne({ username: username }, function(err, foundUser) {
                if (err) {
                    if (req.file)
                        fs.unlinkSync(req.file.path);
                    return res.status(400).json({ success: false, message: "an error occured" })

                } else {
                    // if username is already in database
                    if (foundUser) {
                        if (req.file)
                            fs.unlinkSync(req.file.path);
                        return res.status(400).json({ success: false, message: "username already exists" })
                    } else {
                        // if email is already in database
                        User.findOne({ email: email }, function(err, foundUser2) {
                            if (err) {
                                if (req.file)
                                    fs.unlinkSync(req.file.path);
                                return res.status(400).json({ success: false, message: "an error occured" })
                            }
                            if (foundUser2) {
                                if (req.file)
                                    fs.unlinkSync(req.file.path);
                                return res.status(400).json({ success: false, message: "email already exists" })
                            }

                            // else username and email are available, register the user
                            else {
                                // initiating new user
                                var newUser = new User({
                                    username: username,
                                    email: email,
                                    password: password,
                                    firstName: req.body.firstName,
                                    middleName: req.body.middleName,
                                    lastName: req.body.lastName,
                                    phoneNumber1: req.body.phoneNumber1,
                                    phoneNumber2: req.body.phoneNumber2,
                                    homeNumber: req.body.homeNumber,
                                    profilePicture: profilePicPath,
                                    verified: false
                                });


                                // creating a temp user until mail verification
                                nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
                                    // some sort of error
                                    if (err) {
                                        if (req.file)
                                            fs.unlinkSync(req.file.path);
                                    }

                                    // user already exists in persistent collection...
                                    if (existingPersistentUser) {
                                        if (req.file)
                                            fs.unlinkSync(req.file.path);
                                        // handle user's existence
                                        return res.status(400).json({ success: false, message: "user already exists" });
                                    }

                                    // a new user created
                                    if (newTempUser) {
                                        var URL = newTempUser[nev.options.URLFieldName];
                                        nev.sendVerificationEmail(email, URL, function(err, info) {
                                            if (err) {
                                                if (req.file)
                                                    fs.unlinkSync(req.file.path);
                                                console.log("error in sending verification email");
                                                console.log(err);
                                            } else {
                                                res.json({ success: true, message: "Verification mail sent" });
                                            }
                                        });
                                        // user already exists in temporary collection...
                                    } else {
                                        if (req.file)
                                            fs.unlinkSync(req.file.path);
                                        // flash message of failure...
                                        res.status(400).json({ success: false, message: "unverified user already exists" });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    },

    // after the user clicks on the verification url sent through email
    verifyEmail: function(req, res) {

        var url = req.params.url;
        nev.confirmTempUser(url, function(err, user) {
            if (err) {
                console.log("Error in confirm temporary user");
                console.log(err);
                console.log("************");
            }
            // user was found!
            if (user) {
                // send confirmation email
                nev.sendConfirmationEmail(user['email'], function(err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        // success at last!!
                        user.verified = true;
                        user.save();
                        console.log("verified: " + user.verified);
                        res.json({ success: true, message: "Email verified successfully" });
                    }
                });
            }

            // user's data probably expired...
            else {
                // redirect to sign-up
                res.json({ success: false, message: "Something wrong happended!, please sign up again" });
            }
        });
    },

    // user requests another verification mail to verify his account
    resendVerification: function(req, res) {
        var email = req.body.email;
        nev.resendVerificationEmail(email, function(err, userFound) {
            if (err) {
                console.log("error at resend Verification email");
                console.log(err);
            } else if (userFound) {
                // every thing went well and the email resent successfully
                res.json({ success: true, message: "Verfication email resent successfully" });
            } else {
                // failure
                res.json({ success: false, message: "Something went wrong, unable to identify your account" });
            }
        });
    }
}

module.exports = registerController;
