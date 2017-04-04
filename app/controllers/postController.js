let Post = require('../models/post.js');
let postController = {

  // Searching posts by kind and species
    searchPosts:function(req, res){
        var Kind = req.header("kind");
        var Species = req.header("species");
        if(Kind != undefined && Species != undefined)
        {
        Post.find({kind:{$regex:Kind},species:{$regex:Species}},function(err, posts){

            if(err)
                res.send(err.message);
            else if(posts.length==0)
                res.json({"message":"No Posts Exists"});
                else
                res.json({posts});
        })
      }
      else if(Kind != undefined)
      {
        Post.find({kind:{$regex:Kind}},function(err, posts){

            if(err)
                res.send(err.message);
            else if(posts.length==0)
                res.json({"message":"No Posts Exists"});
                else
                res.json({posts});
        })
      }
      else if(Species != undefined)
      {
        Post.find({species:{$regex:Species}},function(err, posts){

            if(err)
                res.send(err.message);
            else if(posts.length==0)
                res.json({"message":"No Posts Exists"});
                else
                res.json({posts});
        })
      }
    },

    // Filtering Posts by Type
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
                res.json({"message":"No Posts Exists"});
                else
                res.json({posts});
        })
    },

    // Filtering and Searching Posts as one method
    searchAndFilterPosts:function(req, res){
        var filterType ;
        var Kind = req.header("kind");
        var Species = req.header("species");
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
            if(Kind != undefined && Species != undefined)
            {
            Post.find({type:filterType,kind:{$regex:Kind},species:{$regex:Species}},function(err, posts){

                if(err)
                    res.send(err.message);
                else if(posts.length==0)
                    res.json({"message":"No Posts Exists"});
                    else
                    res.json({posts});
            })
          }
          else if(Kind != undefined)
          {
            Post.find({type:filterType,kind:{$regex:Kind}},function(err, posts){

                if(err)
                    res.send(err.message);
                else if(posts.length==0)
                    res.json({"message":"No Posts Exists"});
                    else
                    res.json({posts});
            })
          }
          else if(Species != undefined)
          {
            Post.find({type:filterType,species:{$regex:Species}},function(err, posts){

                if(err)
                    res.send(err.message);
                else if(posts.length==0)
                    res.json({"message":"No Posts Exists"});
                    else
                    res.json({posts});
            })
          }
    }
}

module.exports = postController;
