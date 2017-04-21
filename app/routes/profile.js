//Telling our project that we're using the express framwork
var express = require('express');
var router = express.Router();

var middleware = require("../middleware");


//Controllers
var profileController = require('../controllers/profileController');
//Multer
var multer = require('multer');
var workData = multer({ dest: "public/images/profilePics" });
var type = workData.single('profilePicture');
var fileStream = require('fs');
//Middleware
var middleware = require("../middleware");

router.get('/profile/view', middleware.isLoggedIn, profileController.viewProfile);
//Data for profile picture should be added later.
router.post('/profile/edit', middleware.isLoggedIn, type, profileController.editProfile);
router.post('/profile/pass', middleware.isLoggedIn, profileController.changePassword);
router.post('/profile/rate', middleware.isLoggedIn, profileController.rateUser);
router.post('/profile/delete', middleware.isLoggedIn, profileController.deleteUser);

//Export router.
module.exports = router;