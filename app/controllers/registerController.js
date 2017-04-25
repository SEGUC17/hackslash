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
var upload = multer({ dest: "views/profilePics" });
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

    if (!firstName) {
        output.success = false;
        output.firstNameMessage = "First name in not entered"
    }

    if (!lastName) {
        output.success = false;
        output.lastNameMessage = "Last name in not entered"
    }

    if (!username) {
        output.success = false;
        output.usernameMessage = "Username in not entered"
    }
    // CHECK USERNAME LENGTH
    else if (username.length < 5 || username.length > 20) {
        output.success = false;
        output.usernameMessage = "Username length must be between 5 and 20 characters";
    }
    // CHECK IF EMAIL IS ENTERED
    if (!email) {
        output.success = false;
        output.emailMessage = "No email entered";
    }
    // CHECK EMAIL FORMAT
    else if (!validateEmail(email)) {
        output.success = false;
        output.emailMessage = "Email format is not valid";
    }

    // CHECK IF PASSWORD IS ENTERED
    if (!password) {
        output.success = false;
        output.passwordMessage = "No password entered";
    }
    // CHECK PASSWORD LENGTH
    else if (password.length < 5) {
        output.success = false;
        output.passwordMessage = "Password length must be more than 5 characters";
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

        verificationURL: 'http://localhost:8080/email-verification/${URL}',
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
            from: 'Do Not Reply <se7ss@pettts.com>',
            subject: 'Confirm your account',
            html: '<p>Please verify your account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
                'paste the following link into your browser:</p><p>${URL}</p>',
            text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
        },

        // confirmation mail configurations
        shouldSendConfirmation: true,
        confirmMailOptions: {
            from: 'Do Not Reply <se7ss@pettts.com>',
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
        // validating the format of username, email, and password
        var validatedInput = validateInput(username, email, password, firstName, lastName);
        //path for default profile pic or the uploaded pic if exists
        var profilePicPath = "views/profilePics/defaultProfile.jpg";
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
                    console.log(err);
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
                                console.log(err);
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
                                        console.log(err);
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
