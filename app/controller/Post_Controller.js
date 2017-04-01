var User = require('../models/user');
var Post = require('../models/post');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname + '-' + Date.now());
    }
});
var upload = multer({ storage: storage }).array('post_pic', 5);




exports.Exchange_Post = function(req, res) {

    if (!req.body) {
        res.status(400).json("problem with the sent request");
        return;
    }
    /////check if loggedin and his post too////
    ////  handle not entered data  ////
    ////  get images               //// 
    let post = new Post(req.body);
    if (post.type != 6 || !post.species_B || !post.kind_B) {
        res.status(403).json("not the same type");
        return;
    }
    if (!post.ownerEmail || !post.type || !post.kind || !post.species) {
        res.status(403).json("incomplete request ");
        return;
    }
    post.save(function(err, Post) {
        if (err) {
            res.status(403).json("problem inserting");
        } else {
            res.json("done");
        }
    })
}

exports.edit_post = function(req, res) {

    if (!req.body || !req.query.id) {
        res.json("error occured");
        return;
    }
    /////check if loggedin his post too////
    ////  handle not entered data  ////
    ////  get images               //// 
    var post = new Post(req.body);
    if (post.type == 6 && (!post.species_B || !post.kind_B))
        res.status(403).json("input problem");

    var id = req.query.id;
    //update all except owner_email
    Post.findOne({ _id: id }, function(err, found_post) { //add ownerEmail here
        console.log(found_post);
        if (err)
            res.status(403).json("project not found or not your project");
        else {

            if (post.type) found_post.type = post.type;
            if (post.kind) found_post.kind = post.kind;
            if (post.species) found_post.species = post.species;
            if (post.kind_B) found_post.kind_B = post.kind_B;
            if (post.species_B) found_post.species_B = post.species_B;
            if (post.price) found_post.price = post.price;
            if (post.description) found_post.description = post.description;
            if (post.note) found_post.note = post.note;
            found_post.Date = Date.now;
            if (post.type != 6) {
                found_post.species_B = "";
                found_post.kind_B = "";
            }
            found_post.save(function(err, updated_post) {
                if (err) res.status(403).json("can't update");
                else
                    res.status(200).json("update succ");


            })

        }


    });

}