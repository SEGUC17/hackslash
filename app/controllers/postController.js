let Post = require('../models/post.js');
let User = require('../models/user.js');


//

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/pets';

var insertDocument = function(db, callback) {
   db.collection('user').insertOne( {

     'username': 'mohamed', 'email': 'mohamed1', 'password': 'mohamed123',
     'firstName': 'mohamed', 'lastName':'alshaer','rate':0.0,'rates':[],'verified':false ,'ratedItems':[]

   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the user collection.");
    callback();
  });
};

var insertDocument1 = function(db, callback) {
   db.collection('post').insertOne( {

     'ownerEmail':'mohamed1','type':1,'kind':'kalb','species':'baladi','price':152.30


   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the post collection.");
    callback();
  });
};



//
let postController = {


    searchPosts:function(req, res){
        var keyword = req.header("searchKeyword");
        Post.find({kind:{$regex:keyword}},function(err, posts){

            if(err)
                res.send(err.message);
            else if(posts.length==0)
                res.send("No Posts Exists");
                else
                res.json({posts});
        })
    },
    filterPosts:function(req, res){
        var filterType ;
        switch(req.header("filter")) {
            case "sell":
                filterType = 1
            break;
            case "shelter":
                filterType = 2;
            break;
            case "mate":
                filterType = 3;
            break;
            case "lost":
                filterType = 4;
            break;
            case "found":
                filterType = 5;
            break;
            case "exchange":
                filterType = 6;
            break;
            default:
                filterType =1 ;
            }
        Post.find({type:filterType},function(err, posts){

            if(err)
                res.send(err.message);
            else if(posts.length==0)
                res.send("No Posts Exists");
                else
                res.json({posts});
        })
    },
    searchAndFilterPosts:function(req, res){
        var filterType ;
        var keyword = req.header("searchKeyword") ;
        switch(req.header("filter")) {
            case "sell":
                filterType = 1
            break;
            case "shelter":
                filterType = 2;
            break;
            case "mate":
                filterType = 3;
            break;
            case "lost":
                filterType = 4;
            break;
            case "found":
                filterType = 5;
            break;
            case "exchange":
                filterType = 6;
            break;
            default:
                filterType =1 ;
            }
        Post.find({type:filterType,kind:{$regex:keyword}},function(err, posts){

            if(err)
                res.send(err.message);
            else if(posts.length==0)
                res.send("No Posts Exists");
                else
                res.json({posts});
        })
    },









    // showing the posts without the contact info of the users
    viewPostsOnly : function(req,res){

        // insterting

        MongoClient.connect(url, function(err, db) {
          assert.equal(null, err);
          insertDocument(db, function() {
              db.close();
          });
        });


      Post.find({},function(err,posts){
        if(err)
          res.send(err.message);
          else if (posts.length ==0 )
            res.send("No posts , Yet ");
            else
              res.json({posts});
      })
    },
    // showing the posts alongside with the info of the useres made these posts
    viewPostsAndInfo : function(req,res){

      MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db, function() {
            db.close();
        });
      });
      MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument1(db, function() {
            db.close();
        });
      });

/*
      var allPosts = [] ;
      var usersEmails =[] ;
      var usersInfo = [] ;*/
      // getting the posts

      var usersInfo=[];

      Post.find({},function(err,allPosts){

        if(err)
          res.send(err.message);
          else if (allPosts.length == 0)
            res.send("No Posts , Yet");
            else{
        for(var i =0 ;i<allPosts.length;i++){
        User.findOne({email : allPosts[i].ownerEmail},function(err,user){
        /*  if(err){
            res.send(err.message);
          }
          else {
            usersInfo[i] =user;
            console.log(usersInfo.length);
          }*/
          usersInfo[i] =user;

        });

        }
          JSON.stringify(usersInfo);
           res.json({allPosts,usersInfo});

          }

      })
      /*
      console.log(allPosts);

      // getting the mails of the users that made posts
      for(var i =0 ; i<allPosts.length ; i++){
        usersEmails[i]=allPosts[i].ownerEmail;

      }
      // getting the info of the useres that made posts
      for(var i =0 ;i<usersEmails.length;i++){
      usersInfo[i] = User.findOne({email : usersEmails[i]});
      }

      res.json({allPosts,usersInfo});*/
    },


  reviewPost : function(req,res){
    var body = req.body;
    var id = body.id;
    var vote = body.vote;
    var up =0;
    var down =0;
    console.log("id is :"+ id);
    console.log("vote is :"+vote);
    Post.findOne({'id':id}, function(err , post){
      if(err)
      res.send(err.message);
      else{
      up = post.upVote;
      console.log ("post.upVote" + post.upVote);
      down = post.downVote;
      console.log ("post.downVote" + post.downVote);

    }
    });
    if(vote ==0 ){
    Post.update({'id':id}, {$set: {downVote:down+1}});
    res.send("down Updated the current down votes are " + down+1);

  }
    else {
    Post.update({'id':id}, {$set: {upVote:up+1}});
    res.send("up Updated the current up votes are " + up+1);

  }

    }


  }















module.exports = postController;
