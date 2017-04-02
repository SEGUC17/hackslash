var express = require("express");
var router  = express.Router();

// REQUIRE FORGET PASSWORD CONTROLLER
var forgetPasswordController = require('../controllers/forgetPasswordController.js')

router.get('/forgetPassword', function(req, res) {
   // HERE : WE SHOULD RENDER THE PAGE THAT ASKS FOR THE USER FOR HIS EMAIL
});
router.post('/forgetPassword', forgetPasswordController.forgetPassword);

module.exports = router;
