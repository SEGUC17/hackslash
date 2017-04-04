var express = require('express');
var router = express.Router();

var postController = require('../controllers/postController.js');

router.get('/post/search', postController.searchPosts);
router.get('/post/filter', postController.filterPosts);
router.get('/post/searchAndfilter', postController.searchAndFilterPosts);

module.exports = router;
