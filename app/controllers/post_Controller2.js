
var mongoose = require('mongoose');
var User = require('../models/user');
var Post = require('../models/post');

////////////////////////////////////elkhatib////////////////////////////////////////////

exports.Shelter_Post = function(req, res) {

    /////check if loggedin and his post too////
    ////  handle not entered data  ////
    ////  get images               ////


    ////handle exceptions
    if (!req.body) {
        res.status(400).json("problem with the sent request");
        return;
    }
     var token = req.body.token ;
    if(!token){ //
 res.status(403).json("not loggedin ");

    }else {
        //loggedin
    var owner_email=req.decoded._doc.email;
    let post = new Post(req.body);
    if (!post.ownerEmail || !post.type || !post.kind || !post.species||!post.gender) {
        res.status(403).json("incomplete request ");
        return;
    }
    if (post.type != 2) {
        res.status(403).json("not type 2");
        return;
    }
    //
    post.ownerEmail=owner_email;//save it with the new email ( from the token )
    post.save(function(err, Post) {
        if (err) {
            res.status(403).json("can not insert");
        } else {
            res.json("done shelter");
        }
    })
}
}



exports.Found_Post = function(req, res) {

    /////check if loggedin and his post too////
    ////  handle not entered data  ////
    ////  get images               ////

    ////handle exceptions
    if (!req.body) {
        res.status(400).json("problem with the sent request");
        return;
    }

    var token = req.body.token ;
    if(!token){ //
 res.status(403).json("not loggedin ");

    }else {
        //loggedin
    var owner_email=req.decoded._doc.email;

    let post = new Post(req.body);
    if (!post.ownerEmail || !post.type || !post.kind || !post.species||!post.gender) {
        res.status(403).json("incomplete request ");
        return;
    }
    if (post.type != 5) {
        res.status(403).json("not the same type");
        return;
    }
    //
    post.ownerEmail=owner_email;//save it with the new email ( from the token )
    post.save(function(err, Post) {
        if (err) {
            res.status(403).json("problem inserting");
        } else {
            res.json("done");
        }
    })
}
}
exports.lost_Post = function(req, res) {

    /////check if loggedin and his post too////
    ////  handle not entered data  ////
    ////  get images               ////

    ////handle exceptions
    if (!req.body) {
        res.status(400).json("problem with the sent request");
        return;
    }

    var token = req.body.token ;
    if(!token){ //
 res.status(403).json("not loggedin ");

    }else {
        //loggedin
    var owner_email=req.decoded._doc.email;

    let post = new Post(req.body);
    if (!post.ownerEmail || !post.type || !post.kind || !post.species||!post.gender) {
        res.status(403).json("incomplete request ");
        return;
    }
    if (post.type != 4) {
        res.status(403).json("not the same type");
        return;
    }
    //

    post.ownerEmail=owner_email;//save it with the new email ( from the token )
    post.save(function(err, Post) {
        if (err) {
            res.status(403).json("problem inserting");
        } else {
            res.json("done");
        }
    })
}
}


/////////////////////////////////////ahmed ali//////////////////////////////////////////////////


exports.Sell_Post = function(req, res) {

    /////check if loggedin and his post too////
    ////  handle not entered data  ////
    ////  get images               ////

    ////handle exceptions
    if (!req.body) {
        res.status(400).json("problem with the sent request");
        return;
    }

    var token = req.body.token ;
    if(!token){ //
 res.status(403).json("not loggedin ");

    }else {
        //loggedin
    var owner_email=req.decoded._doc.email;
    let post = new Post(req.body);
    if (!post.ownerEmail || !post.type || !post.kind || !post.species||!post.gender||!post.price) {
        res.status(403).json("incomplete request ");
        return;
    }
    if (post.type != 1) {
        res.status(403).json("not the same type");
        return;
    }
    //
    post.ownerEmail=owner_email;//save it with the new email ( from the token )
    post.save(function(err, Post) {
        if (err) {
            res.status(403).json("problem inserting");
        } else {
            res.json("done");
        }
    })
}
}


exports.Mate_Post = function(req, res) {

    /////check if loggedin and his post too////
    ////  handle not entered data  ////
    ////  get images               ////

    ////handle exceptions
    if (!req.body) {
        res.status(400).json("problem with the sent request");
        return;
    }
    var token = req.body.token ;
    if(!token){ //
 res.status(403).json("not loggedin ");

    }else {
        //loggedin
    var owner_email=req.decoded._doc.email;

    let post = new Post(req.body);
    if (!post.ownerEmail || !post.type || !post.kind || !post.species||!post.gender) {
        res.status(403).json("incomplete request ");
        return;
    }
    if (post.type != 3) {
        res.status(403).json("not the same type");
        return;
    }
    //
    post.ownerEmail=owner_email;//save it with the new email ( from the token )
    post.save(function(err, Post) {
        if (err) {
            res.status(403).json("problem inserting");
        } else {
            res.json("done");
        }
    })
}
}
