var express = require('express');
var router = express.Router();

// REQUIRE MIDDLEWARE
var middleware = require("../middleware");
var postController = require('../controllers/postController.js');
var postController2 = require('../controllers/post_Controller2.js');


router.get('post/viewPostsAndInfo',middleware.isLoggedIn,postController.viewPostsAndInfo);
router.post('post/review',middleware.isLoggedIn,postController.reviewPost);
router.post('/post/exchange',middleware.isLoggedIn , postController.Exchange_Post);
router.post('/post/edit',middleware.isLoggedIn, postController.edit_post);
//
//-------------------------------------------------------------------//

router.get('/post/search',middleware.isLoggedIn, postController.searchPosts);
router.get('/post/filter',middleware.isLoggedIn, postController.filterPosts);
router.get('/post/searchAndfilter',middleware.isLoggedIn, postController.searchAndFilterPosts);
//
//-------------------------------------------------------------------//

router.post('/post/sell',middleware.isLoggedIn, postController2.Sell_Post);
router.post('/post/mate',middleware.isLoggedIn, postController2.Mate_Post);
//
//-------------------------------------------------------------------//

router.post('/post/shelter',middleware.isLoggedIn, postController2.Shelter_Post);
router.post('/post/lost',middleware.isLoggedIn, postController2.lost_Post);
router.post('/post/found',middleware.isLoggedIn, postController2.Found_Post);




module.exports = router;
