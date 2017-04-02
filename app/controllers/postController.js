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

    reviewPost : function(req , res){
      var id = req.body.id;
      var vote = req.body.vote;
      console.log("id : "+id);
      console.log("vote : "+vote);
       Post.findOne({ _id: id }, function(err, found_post) {
         if (found_post == null)
            res.status(403).json("project not found or not your project");
            else {
              if(vote == 0){
                found_post.downVote++;
                found_post.save(function(err, updated_post) {
                   if (err) res.status(403).json("can't update");
                   else
                       res.status(200).json("update succ");

               })
              }
              else if (vote ==1) {
                found_post.upVote++;
                found_post.save(function(err, updated_post) {
                   if (err) res.status(403).json("can't update");
                   else
                       res.status(200).json("update succ");

               })
              }
              else {
                res.send("Not a Valid Vote")
              }
            }


       });


    }





  }















module.exports = postController;
