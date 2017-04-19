var express = require('express');
var router = express.Router();

// REQUIRE MIDDLEWARE
var middleware = require("../middleware");
var postController = require('../controllers/postController.js');

router.get('/post/viewPostsAndInfo',middleware.isLoggedIn,postController.viewPostsAndInfo);
router.post('/post/review',middleware.isLoggedIn,postController.reviewPost);
router.post('/post/exchange',middleware.isLoggedIn , postController.exchangePost);
router.post('/post/edit',middleware.isLoggedIn, postController.editPost);
router.post('/post/shelter',middleware.isLoggedIn, postController.shelterPost);
router.post('/post/lost',middleware.isLoggedIn, postController.lostPost);
router.post('/post/found',middleware.isLoggedIn, postController.foundPost);
router.post('/post/sell',middleware.isLoggedIn, postController.sellPost);
router.post('/post/mate',middleware.isLoggedIn, postController.matePost);
router.get('/post/specificUser',postController.findOwnerByPostID);


module.exports = router;
