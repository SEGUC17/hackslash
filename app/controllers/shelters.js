//requiring the DB

var mongoose = require('mongoose');
var  shelterDB = mongoose.model('post');// needs to be changed




// testing with a place holder function
var sendJsonResponse = function(res, status, content) {
res.status(status);
res.json(content);
};

/*module.exports.ShelterCreate = function (req, res) {
 sendJsonResponse(res,200,{"status":"succuess"})
};*/




module.exports.ShelterCreate = function(req, res) {
shelterDB.create({
  type:2,
    description:req.body.description,
ownerEmail:"alkhaatib@gmail.com" /// << testing



}, function(err, post) {
  if(!req.body.description){
    sendJsonResponse(res, 400, "cannot post without a description");
   res.redirect("/findashelter/");

 }else

  if(req.file){
    post.update({image: req.file.filename}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("uploaded image to post");
        }
    });
  }
if (err) {
sendJsonResponse(res, 400, err);
} else {
sendJsonResponse(res, 201, post);
}
});
console.log("it complied to the end");
    //req.flash("success", "Your portfolio was successfully created");
//  res.redirect("/findashelter/");
}

module.exports.lostReqCreate= function(req, res) {

if(!req.file){
  sendJsonResponse(res, 400, "cannot post a lost request without an image");
}


shelterDB.create({
  type:4,
    description:req.body.description,
ownerEmail:"alkhaatib@gmail.com" /// << testing



}, function(err, post) {
  if(!req.body.description){
    sendJsonResponse(res, 400, "cannot post without a description");
   res.redirect("/findashelter/");

 }else

  if(req.file){
    post.update({image: req.file.filename}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("uploaded image to post");
        }
    });
  }
if (err) {
sendJsonResponse(res, 400, err);
} else {
sendJsonResponse(res, 201, post);
}
});
console.log("it complied to the end");
    //req.flash("success", "Your portfolio was successfully created");
//  res.redirect("/findashelter/");
}




module.exports.foundReqCreate = function(req, res) {

if(!req.file){
  sendJsonResponse(res, 400, "insert an image to ease the finding ");
}


shelterDB.create({
  type:4,
    description:req.body.description,
ownerEmail:"alkhaatib@gmail.com" /// << testing



}, function(err, post) {
  if(!req.body.description){
    sendJsonResponse(res, 400, "cannot post an empty found req please include a description");
   res.redirect("/findashelter/");

 }else

  if(req.file){
    post.update({image: req.file.filename}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("uploaded image to post");
        }
    });
  }
if (err) {
sendJsonResponse(res, 400, err);
} else {
sendJsonResponse(res, 201, post);
}
});
console.log("it complied to the end");
    //req.flash("success", "Your portfolio was successfully created");
//  res.redirect("/findashelter/");
}
