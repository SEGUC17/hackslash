var express = require('express');
var router = express.Router();

// REQUIRE MIDDLEWARE
var middleware = require("../middleware");
var postController = require('../controllers/postController.js');


//=======


//>>>>>>> origin/master
router.get('/post/viewPostsAndInfo',middleware.isLoggedIn,postController.viewPostsAndInfo);
router.post('/post/review',middleware.isLoggedIn,postController.reviewPost);
router.post('/post/exchange',middleware.isLoggedIn , postController.Exchange_Post);
router.post('/post/edit',middleware.isLoggedIn, postController.edit_post);

//////////////////////////////////////////////////////////////////

router.post('/post/shelter',middleware.isLoggedIn, postController.Shelter_Post);
router.post('/post/lost',middleware.isLoggedIn, postController.lost_Post);
router.post('/post/found',middleware.isLoggedIn, postController.Found_Post);




module.exports = router;
