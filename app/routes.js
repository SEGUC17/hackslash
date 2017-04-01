//Telling our project that we're using the express framwork
var express = require('express');
var router = express.Router();
var Post_Controller = require('../app/controller/Post_Controller');

//==============================================================//
//============All our routing should be handled here============//
//==============================================================//

router.post('/post/exchange', Post_Controller.Exchange_Post);
router.post('/post/edit', Post_Controller.edit_post);


//Export router.
module.exports = router;