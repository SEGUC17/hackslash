var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); // CREATE , SIGN IN AND VERIFY TOKEN

// REQUIRE USER MODEL
var User = require('../models/user.js');

// REQUIRE MIDDLEWARE
var middleware = require("../middleware");

var messageController = {
  // VIEW : RETURNS THE MESSAGES SENT TO THE USER
  view: function(req, res) {
    // GETTING THE USERNAME OF THE LOGGED IN USER WHO WANTS TO VIEW HIS MESSAGES
    var username = req.decoded._doc.username;
    // FINDING THE USER WITH THIS USERNAME
    User.findOne( { username: username }, function(err, foundUser) {
      if (err || !foundUser) res.status(400).json({ success: false, message : "Something Wrong Happened !!" });
      else {
        // USER IS FOUND, SO SEND THE MESSAGES SENT TO HIM
        res.status(200).json({ success: true, messagesUsernames: foundUser.messagesUsernames, messagesContents : foundUser.messagesContents, message : "Messages Sent Successfully." });
      }
     }
    );
  },
  // SEND : SENDS A MESSAGE FROM THE LOGGED IN USER TO THE USER WITH THE USERNAME SPECIFIED.
  send: function(req, res) {
    // EXTRACTING ALL NEEDED INFO ABOUT THE MESSAGE (SENDER, RECEIVER, CONTENT)
    var senderUsername = req.body.senderUsername;
    var receiverUsername = req.body.receiverUsername;
    var messageContent = req.body.messageContent;
    // FINDING THE RECEIVER AND UPDATING THE TWO ARRAYS

    // UPDATING THE (messagesUsernames) Array
    User.update( { username: receiverUsername }, { $push: { messagesUsernames: senderUsername } }, function(err, foundUser) {
        // NO NEED TO OUTPUT ANYTHING HERE BECAUSE WE WILL NEED TO OUTPUT THE SAME AS THE NEXT UPDATE
      }
    );

    // UPDATING THE (messagesContents) Array
    User.update( { username: receiverUsername }, { $push: { messagesContents: messageContent } }, function(err, foundUser){
        if (err) res.status(400).json({ success: false, message : "Something Wrong Happened, the message is not sent.!!" });
        else res.status(200).json({ success: true, message : "Message sent Successfully." });
      }
    );
  }

}

module.exports = messageController;
