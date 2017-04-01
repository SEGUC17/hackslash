var express = require("express");
var router  = express.Router();

// REQUIRE REGISTER CONTROLLER
var registerController = require('../controllers/registerController.js')

router.post("/register", registerController.register);

module.exports = router;
