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

profileRouter.get('/profile/view',profileController.viewProfile);
//Data for profile picture should be added later.
profileRouter.post('/profile/edit',/*workData.single('file'),*/profileController.editProfile);
profileRouter.post('/profile/pass',profileController.changePassword);

//Export router.
module.exports = profileRouter;