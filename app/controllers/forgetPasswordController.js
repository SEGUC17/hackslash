var User = require('../models/user.js');

var forgetPasswordController = {
  /*
    forgetPassword description
    It should ask the user for his email,
    if it is an email for an already registered user it should send him an email using (sendForgetPasswordEmail) method
  */
  forgetPassword : function (req, res) {
    var email = req.body.email;
    User.findOne({email: email}, function(err, foundUser){
      if(err){
        throw err;
      } else {
        if(foundUser){
          sendForgetPasswordEmail(foundUser);
        } else {
          res.json({success: false, message: "Wrong Email"})
        }
      }
    });
  }
}


/*
  sendForgetPasswordEmail description
  - GENERATE TOKEN
  - SEND AN EMAIL WITH A LINK CONTAINING THE GENERATED TOKEN TO THE USER USING SendGrid
*/
  var sendForgetPasswordEmail = function (foundUser) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var token = '';
    for (var i = 32; i > 0; --i) {
      token += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    // create expiration date
    var expires = new Date();
    expires.setHours(expires.getHours() + 6);

    User.update({username:foundUser.username}, {$set: {resetToken: token, resetTokenExpiryDate : expires}}, function(err){});
        // using SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    var helper = require('sendgrid').mail;

    // HERE WE SHOULD PUT OUR COMPANY'S EMAIL
    from_email = new helper.Email("oyaraouf@gmail.com");
    to_email = new helper.Email(foundUser.email);
    subject = "Reset Password";
    content = new helper.Content("text/plain", "To reset your password, please go to http://localhost:8080/resetPassword?t=" + token);
    mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')("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");
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sg.API(request, function(error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });
  }

module.exports = forgetPasswordController;
