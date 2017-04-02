var express = require("express");
var router  = express.Router();

// REQUIRE REGISTER CONTROLLER
var registerController = require('../controllers/registerController.js')

router.post("/register", registerController.register);

router.get("/email-verification/:url", registerController.verifyEmail);

router.post("/resend-verification-code/:id", registerController.resendVerification);

module.exports = router;
