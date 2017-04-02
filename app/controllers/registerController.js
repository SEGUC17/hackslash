var bcrypt = require('bcrypt'); // BCRYPT FOR PASSWORD ENCRYPTION
var mongoose = require('mongoose');
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var nev = require('email-verification')(mongoose);
var nodemailer = require('nodemailer');
var configure = require('../config/config');

// REQUIRE USER MODEL
var User = require('../models/user.js');

// a helper method to validate the format of an email
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/* function to validate the format of the entered username, email, password of
the user before registration */
function validateInput(username, email, password){

  var output = {
    success: true
  };

  if(!username){
    output.success = false;
    output.usernameMessage = "Username in not entered"
  }
  // CHECK USERNAME LENGTH
  else if(username.length < 5 || username.length > 20){
      output.success = false;
      output.usernameMessage = "Username length must be between 5 and 20 characters";
  }

  // CHECK IF EMAIL IS ENTERED
  if(!email){
    output.success = false;
    output.emailMessage = "No email entered";
  }
  // CHECK EMAIL FORMAT
  else if(!validateEmail(email)){
    output.success = false;
    output.emailMessage = "Email format is not valid";
  }

  // CHECK IF PASSWORD IS ENTERED
  if(!password){
    output.success = false;
    output.passwordMessage = "No password entered";
  }
  // CHECK PASSWORD LENGTH
  else if(password.length < 5){
      output.success = false;
      output.passwordMessage = "Password length must be more than 5 characters";
  }

  return output;

}

// =============================================================================

// EMAIL CONFIG
// hashing password function for encryption
function myHasher(password, tempUserData, insertTempUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    if(err)
      throw err;
    bcrypt.hash(password, salt, function(err, hash) {
      return insertTempUser(hash, tempUserData, callback);
    });
  });
};

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
        from: 'Do Not Reply <mohamed@hussein.com>',
        subject: 'Confirm your account',
        html: '<p>Please verify your account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
                'paste the following link into your browser:</p><p>${URL}</p>',
        text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
    },

    // confirmation mail configurations
    shouldSendConfirmation: true,
    confirmMailOptions: {
    from: 'Do Not Reply <mohamed@hussein.com>',
    subject: 'Successfully verified!',
    html: '<p>Your account has been successfully verified.</p>',
    text: 'Your account has been successfully verified.'
    },

    // setting hashing password function
    hashingFunction: myHasher
},
  function(err, options){
    if(err){
      console.log(err);
    }
});

// generation temporary user model
nev.generateTempUserModel(User, function(err, tempUserModel){
  if(err){
    console.log("Error");
    console.log("================");
    console.log(err);
  }
});

console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));

// var sgTransport = require('nodemailer-sendgrid-transport');
//
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
}, function(err, result){
  if(err){
    console.log("errrrrrrrrrrrrrr");
    console.log("========================");
    console.log(err);
  } else {
    console.log(result);
  }
});

// =============================================================================

var registerController = {

    register: function(req, res){

        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        // validating the format of username, email, and password
        var validatedInput = validateInput(username, email, password);

        // if the validation respone is false
        if(validatedInput.success == false){
          // send the validation message specified in the function
          res.json(validatedInput);
        } else {
          // checking if the entered username/email already exists in the database
          User.findOne({username: username}, function(err, foundUser){
            if(err){
              throw err;
            } else {
              // if username is already in database
              if(foundUser){
                return res.json({success: false, message: "username already exists"})
              } else {
                // if email is already in database
                User.findOne({email: email}, function(err, foundUser2){
                  if(err){
                    console.log(err);
                  }
                  if(foundUser2){
                    return res.json({success: false, message: "email already exists"})
                  }

                  // else username and email are available, register the user
                  else
                  {
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
                        //profilePicture: req.file.filename,
                        verified: false
                      });

                      // creating a temp user until mail verification
                      nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
                        // some sort of error
                        if (err){
                          console.log(err)
                        }

                        // user already exists in persistent collection...
                        if (existingPersistentUser){
                          // handle user's existence
                          return res.json({success: false, message: "user already exists"});
                        }

                        // a new user created
                        if (newTempUser) {
                            var URL = newTempUser[nev.options.URLFieldName];
                            nev.sendVerificationEmail(email, URL, function(err, info) {
                                if (err){
                                  console.log("error!");
                                  console.log(err);
                                }
                                res.json({success: true, message: "Verification mail sent"});
                            });
                        // user already exists in temporary collection...
                        } else {
                            // flash message of failure...
                            res.json({success: false, message: "unverified user already exists"});
                        }
                      });
                  }
                });
              }
            }
          });
        }
    },

    verifyEmail: function(req, res){

      var url = req.params.url;
      nev.confirmTempUser(url, function(err, user) {
        if (err)
            throw err;

        // user was found!
        if (user) {
            // send confirmation email
            nev.sendConfirmationEmail(user['password'], function(err, info) {
              if(err)
                throw err;
              // success at last!!
              res.json({success: true, message: "Email verified successfully"});
            });
        }

        // user's data probably expired...
        else{
          // redirect to sign-up
        }
      });
    }
}

module.exports = registerController;
