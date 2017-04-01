var bcrypt = require('bcrypt'); // BCRYPT FOR PASSWORD ENCRYPTION

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

var registerController = {

    register: function(req, res){
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        var validatedInput = validateInput(username, email, password);

        if(validatedInput.success == false){
          res.json(validatedInput);
        } else {
          User.findOne({username: username}, function(err, foundUser){
            if(err){
              throw err;
            } else {
              if(foundUser){
                res.json({success: false, message: "username already exists"})
              } else {
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
                  profilePicture: req.file.filename,
                  verified: false
                });
                User.addUser(newUser, function(err, user){
                  res.json({success: true, message: "Registered unverified user"});
                })
              }
            }
          });
        }
    }
}

module.exports = registerController;
