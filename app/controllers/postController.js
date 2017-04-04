let Post = require('../models/post.js');
let User = require('../models/user.js');
let postController = {

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

    // Reviewing a Post . check Logged-in
       reviewPost : function(req , res){

         var id = req.header("id");
         var userMail = req.body.userMail;
         var vote = req.body.vote;

         console.log("id : "+id);
         console.log("userMail : " + userMail);
         console.log("vote : "+vote);

         Post.findOne({_id:id },function(err ,post){
           if(post != null ){
             res.send("Post Doesn't Exixt");
             return;
           }
           else if (post.ownerEmail == userMail) {
             res.send("You Own This Post so , You Can't Rate it ");
             return ;
           }
           else if (post.raters.includes(userMail)) {
             res.send("You Rated This Item Before");
             return;
           }
           else {
             if(vote == 0){
               found_post.downVote++;
               found_post.raters.push(userMail);
               found_post.save(function(err, updated_post) {
                  if (err) res.status(403).json("can't update");
                  else
                      res.status(200).json("update succ downVoted");

              })
             }
             else if (vote ==1) {
               found_post.upVote++;
               found_post.raters.push(userMail);
               found_post.save(function(err, updated_post) {
                  if (err) res.status(403).json("can't update");
                  else
                      res.status(200).json("update succ upvoted");

              })
             }
             else {
               res.send("Not a Valid Vote");
             }
           }
         });
       }
}

module.exports = postController;
