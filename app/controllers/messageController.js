var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); // CREATE , SIGN IN AND VERIFY TOKEN

// REQUIRE USER MODEL
var User = require('../models/user.js');

// REQUIRE MIDDLEWARE
var middleware = require("../middleware");

var messageController = {
    
    // View Function is used to return the user all his messages .
    view: function(req, res) {
        var email = req.decoded._doc.email;
        User.findOne({ email: email },
            function(err, foundUser) {
                if(foundUser){
                    res.json({ success: true, messagesUsernames: foundUser.messagesUsernames, messagesContents: foundUser.messagesContents, message: "Messages Sent Successfully." });
                }else{
                    res.json({success: false, message: "Could not get messages"});
                }
            }
        );
    },

     // Send Function is used to add a new message for the receiver in his inbox with information about the sender .
    send: function(req, res) {
        var senderUsername = req.body.senderUsername;
        var receiverUsername = req.body.receiverUsername;
        var messageContent = req.body.messageContent;
        User.update({ username: receiverUsername }, { $push: { messagesUsernames: senderUsername } },
            function(err, foundUser) {}
        );

        User.update({ username: receiverUsername }, { $push: { messagesContents: messageContent } },
            function(err, foundUser) {}
        );
        res.json({ success: true, message: "Message Sent Successfully." })
    }

}

module.exports = messageController;
