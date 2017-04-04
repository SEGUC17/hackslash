var express = require('express');
var router = express.Router();

// REQUIRE MIDDLEWARE
var middleware = require("../middleware");

var postController = require('../controllers/postController.js');

router.get('post/viewPostsAndInfo',postController.viewPostsAndInfo);
router.post('post/review',postController.reviewPost);


module.exports = router;
