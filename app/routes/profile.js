//Telling our project that we're using the express framwork
var express = require('express');
var router = express.Router();
var middleware = require("../middleware");

//Controllers
var profileController = require('../controllers/profileController');
//Multer
var multer = require('multer');
var workData = multer({dest:'views/uploads'});
var type = workData.single('upload');
var fileStream = require('fs');

router.post('profile/rate',middleware.isLoggedIn,profileController.rateUser);
router.post('profile/delete',middleware.isLoggedIn,profileController.deleteUser);

//Export router.
module.exports = router;

