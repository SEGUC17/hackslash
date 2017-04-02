var express = require("express");
var router  = express.Router();

// REQUIRE REGISTER CONTROLLER
var resetPasswordController = require('../controllers/resetPasswordController.js')

router.get('/resetPassword', function(req, res) {
   // HERE : WE SHOULD RENDER THE PAGE THAT ASKS FOR A NEW PASSWORD
});

// AFTER THE USER ENTERS HIS DESIRED NEW EMAIL
router.post('/resetPassword', resetPasswordController.resetPassword);

module.exports = router;
