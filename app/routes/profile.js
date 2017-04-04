//Telling our project that we're using the express framwork
var express = require('express');
var profileRouter = express.Router();
//Controllers
var updateController = require('../controllers/updateController');
var profileController = require('../controllers/profileController');
//Multer
var multer = require('multer');
var workData = multer({dest:'views/uploads'});
var type = workData.single('upload');
var fileStream = require('fs');

router.post('/profile/rate',middleware.isLoggedin,profileController.rateUser);
router.post('/profile/delete',middleware.isLoggedin,profileController.deleteUser);

//Export router.
module.exports = profileRouter;
