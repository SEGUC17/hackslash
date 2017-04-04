var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController.js');

// REQUIRE MIDDLEWARE
var middleware = require("../middleware");

router.post('/post/exchange',middleware.isLoggedIn , postController.Exchange_Post);
router.post('/post/edit',middleware.isLoggedIn, postController.edit_post);
module.exports = router;
