//Telling our project that we're using the express framwork
var express = require('express');
var router = express.Router();
//Controllers
var updateController = require('../controllers/updateController');
var profileController = require('../controllers/profileController');
//Multer
var multer = require('multer');
var workData = multer({dest:'views/uploads'});
var type = workData.single('upload');
var fileStream = require('fs');
//Middleware
var middleware = require("../middleware");

router.get('/profile/view',middleware.isLoggedIn,profileController.viewProfile);
//Data for profile picture should be added later.
router.post('/profile/edit',/*workData.single('file'),*/middleware.isLoggedIn,profileController.editProfile);
router.post('/profile/pass',middleware.isLoggedIn,profileController.changePassword);

//Export router.
module.exports = router;