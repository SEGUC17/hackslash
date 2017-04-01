var express = require("express");
var router  = express.Router();

// REQUIRE FORGET PASSWORD CONTROLLER
var forgetPasswordController = require('../controllers/forgetPasswordController.js')

router.get('/forgetPassword', forgetPasswordController.forgetPassword);

module.exports = router;
