//Telling our project that we're using the express framwork
var express = require('express');
var router = express.Router();
var postController = require('./controllers/postController');

//==============================================================//
//============All our routing should be handled here============//
//==============================================================//
router.post('/post/search', postController.searchPosts);
//Export router.
module.exports = router;
