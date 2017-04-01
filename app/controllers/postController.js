let Post = require('../models/post.js');
let postController = {

    searchPosts:function(req, res){
        var keyword = req.body.searchKeyword ;
        console.log(keyword);
        Post.find({kind:{$regex:keyword}},function(err, posts){

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
