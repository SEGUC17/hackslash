var express = require('express');
var router = express.Router();
var middleware = require("../middleware");
var postController = require('../controllers/postController.js');

router.get('/post/search', postController.searchPosts);
router.get('/post/filter', postController.filterPosts);
router.get('/post/searchAndfilter', postController.searchAndFilterPosts);
router.post('/post/exchange',middleware.isLoggedIn , postController.Exchange_Post);
router.post('/post/edit',middleware.isLoggedIn, postController.edit_post);

module.exports = router;
