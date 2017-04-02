let Post = require('../models/post.js');
let User = require('../models/user.js');

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

      Post.find({},function(err,allPosts){
        if(err)
          res.send(err.message);
          else if (allPosts.length == 0)
            res.send("No Posts , Yet");
            else{
          User.find({},function(err,allUsers){
            if(err) res.send(err.message);
            else  {
               res.json({allPosts,allUsers});
            }
          })
        }
      });
    },



  reviewPost : function(req,res){
    var body = req.body;
    var id = body.id;
    var vote = body.vote;
    var up =0;
    var down =0;
    console.log("id is :"+ id);
    console.log("vote is :"+vote);
    Post.findOne({'_id':id}, function(err , post){

      if(post != null){
      up = post.upVote;
      console.log ("post.upVote" + post.upVote);
      down = post.downVote;
      console.log ("post.downVote" + post.downVote);

      if(vote ==0 ){
      Post.update({'_id':id}, {$set: {downVote:down+1}});
      res.send("down Updated the current down votes are " + down+1);

    }
      else {
      Post.update({'_id':id}, {$set: {upVote:up+1}});
      res.send("up Updated the current up votes are " + up+1);

    }

    }
    else {
       res.send("Error in ID");
    }
    });


    }


  }















module.exports = postController;
