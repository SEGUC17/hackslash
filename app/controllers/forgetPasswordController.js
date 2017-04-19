var User = require('../models/user.js');

var forgetPasswordController ={
  /*
  forgetPassword description
  It should ask the user for his email,
  if it is an email for an already registered user it should send him an email using (sendForgetPasswordEmail) method
  */
  forgetPassword : function (req, res){
    var email = req.body.email;
    console.log(email);
    User.findOne({email: email}, function(err, foundUser){
      if(err){
        throw err;
      }else{
        if(foundUser){
          // SEND HIM AN EMAIL
          sendForgetPasswordEmail(foundUser);
          res.json({success: true, message: "Reset password email sent."});
        }else{
          res.json({success: false, message: "Wrong Email"});
        }
      }
    });
  }
}
/*
sendForgetPasswordEmail description
- Generate Token
- Send an email with a link containing the generated token to the user using SendGrid.
*/
var sendForgetPasswordEmail = function (foundUser){
  // Generating token
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var token = '';
  for (var i = 32; i > 0; --i){
    token += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  //////////////////////// TOKEN GENERATED \\\\\\\\\\\\\\\\\\\\\\\\\\
  // Create expiration date (I set it to 6 hours after the current date)
  var expires = new Date();
  expires.setHours(expires.getHours() + 6);
  // Save in the database that this user has a reset token equal to the generated one.
  User.update({username:foundUser.username}, {$set: {resetToken: token, resetTokenExpiryDate : expires}}, function(err){});
  // Now I will send him an email using SendGrid
  var helper = require('sendgrid').mail;
  // Here we should put our company's email
  fromEmail = new helper.Email("oyaraouf@gmail.com");
  toEmail = new helper.Email(foundUser.email);
  subject = "Reset Password";
  content = new helper.Content("text/plain", "To reset your password, please go to http://localhost:8080/resetPassword/" + token);
  mail = new helper.Mail(fromEmail, subject, toEmail, content);

  var sg = require('sendgrid')("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");
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });
  //////////////////////// EMAIL SENT \\\\\\\\\\\\\\\\\\\\\\\\\\
  sg.API(request, function(error, response){
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
}

module.exports = forgetPasswordController;
