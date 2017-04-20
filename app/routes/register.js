var express = require("express");
var router = express.Router();


//profile picture upload
var multer = require('multer');
var upload = multer({ dest: "public/images/profilePics" });
var type = upload.single('profilePic');

// REQUIRE REGISTER CONTROLLER
var registerController = require('../controllers/registerController.js');

router.post("/register", type, registerController.register);
router.get("/email-verification/:url", registerController.verifyEmail);
router.post("/resend-verification-code", registerController.resendVerification);

module.exports = router;