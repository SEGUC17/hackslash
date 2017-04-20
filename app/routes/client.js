var express = require('express');
var router = express.Router();



var multer = require('multer');
var upload = multer({ dest: "views/postsGallery" });
var type = upload.single('postPic');

// REQUIRE MIDDLEWARE
var middleware = require("../middleware");
var postController = require('../controllers/postController.js');

router.get('/post/viewPostsAndInfo', middleware.isLoggedIn, postController.viewPostsAndInfo);
router.post('/post/review', middleware.isLoggedIn, postController.reviewPost);
router.post('/post/exchange', middleware.isLoggedIn, type, postController.exchangePost);
router.post('/post/edit', middleware.isLoggedIn, type, postController.editPost);
router.post('/post/shelter', middleware.isLoggedIn, type, postController.shelterPost);
router.post('/post/lost', middleware.isLoggedIn, type, postController.lostPost);
router.post('/post/found', middleware.isLoggedIn, type, postController.foundPost);
router.post('/post/sell', middleware.isLoggedIn, type, postController.sellPost);
router.post('/post/mate', middleware.isLoggedIn, type, postController.matePost);

module.exports = router;