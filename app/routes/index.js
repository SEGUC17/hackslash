var express = require('express');
var router = express.Router();
var path = require('path');

// REQUIRE MIDDLEWARE
var middleware = require("../middleware");

router.get('*', function(req, res) {
    res.sendFile(path.resolve('./public/index.html'));
});

module.exports = router;
