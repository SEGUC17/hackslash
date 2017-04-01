let Post = require('../models/post.js');
let postController = {


    searchPosts:function(req, res){
        var keyword = req.body.searchKeyword ;
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
        switch(req.body.filter) {
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
        var keyword = req.body.searchKeyword ;
        switch(req.body.filter) {
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
    }
}

module.exports = postController;
