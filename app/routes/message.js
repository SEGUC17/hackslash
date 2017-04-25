var express = require('express');
var router = express.Router();

var messageController = require('../controllers/messageController.js');

var middleware = require("../middleware");

router.post('/message/send', middleware.isLoggedIn, messageController.send);
router.get('/message/view' , middleware.isLoggedIn, messageController.view);

module.exports = router;
