let Post = require('../models/post.js');
let User = require('../models/user.js');


let postController = {



/// post type=> exchange
Exchange_Post: function(req, res) {
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
    let post = new Post(req.body); //handled the extra attributes are not considered
    console.log(owner_email);
    if (!owner_email || !post.type || !post.kind || !post.species||!post.gender) {
        res.status(403).json("incomplete request ");
        return;
    }
    if (post.type != 6 || !post.species_B || !post.kind_B||!post.gender_B) {
        res.status(403).json("not exchange post");
        return;
    }
    post.ownerEmail=owner_email;//save it with the new email ( from the token )
    post.save(function(err, Post) {
        if (err) {
            res.status(403).json("problem inserting");
        } else {
            res.json("done");
        }
    })
}
},


/// edit post
edit_post: function(req, res) {
    ////  get images               ////
    //handle exceptions

     if (!req.body || !req.query||!req.query.id) {
        res.status(400).json("error occured");
        return;
    }
  var token = req.body.token ;
    if(!token){ //
 res.status(403).json("not loggedin ");
    }else {
     if(!req.decoded){
         res.status(403).json("not loggedin ");
         return;
     }
    var owner_email=req.decoded._doc.email;
    var post = new Post(req.body);
    post.ownerEmail=owner_email;

    if ( !post.type || !post.kind || !post.species||!post.gender) {
        res.status(403).json("incomplete request ");
        return;
    }
    if (post.type == 6 && (!post.species_B || !post.kind_B||!post.gender_B||post.gender_B=='null'))
       { res.status(403).json("input problem with exchange type");
         return;
        }
    var id = req.query.id;
    Post.findOne({ _id: id,ownerEmail:owner_email }, function(err, found_post) { //add ownerEmail here
        if (err)
            res.status(403).json("project not found or not your project");
        else {

            //no match exception
            if(found_post==null){
                res.status(403).json("post does not match with anything");
                return
            }

            if (post.type) found_post.type = post.type;
            if (post.kind) found_post.kind = post.kind;
            if (post.species) found_post.species = post.species;
            if (post.gender) found_post.gender = post.gender;
            if (post.kind_B) found_post.kind_B = post.kind_B;
            if (post.species_B) found_post.species_B = post.species_B;
            if (post.price) found_post.price = post.price;
            if (post.description) found_post.description = post.description;
            if (post.note) found_post.note = post.note;
            if (post.gender_B)found_post.gender_B=post.gender_B;
            found_post.Date = Date.now;
            if (post.type != 6) {
                found_post.species_B = "";
                found_post.kind_B = "";
                found_post.gender_B="null";
            }
            found_post.save(function(err, updated_post) {
                if (err) res.status(403).json("can't update");
                else
                    res.status(200).json("update succ");


            })

        }


    });

}
},




///rest of the posts methods goes here

  // Searching posts by kind and species
    searchPosts:function(req, res){
        var Kind = req.header("kind");
        var Species = req.header("species");
        if(Kind != undefined && Species != undefined)
        {
        Post.find({kind:{$regex:Kind},species:{$regex:Species}},function(err, posts){

            if(err)
                res.json(err.message);
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
                res.json(err.message);
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
                res.json(err.message);
            else if(posts.length==0)
                res.json({"message":"No Posts Exists"});
                else
                res.json({posts});
        })
      }else{
          res.json({"message":"Please enter a search parameter."});
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
                filterType = 1 ;
            }
        Post.find({type:filterType},function(err, posts){

            if(err)
                res.json(err.message);
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
                filterType = 1 ;
            }
            if(Kind != undefined && Species != undefined)
            {
            Post.find({type:filterType,kind:{$regex:Kind},species:{$regex:Species}},function(err, posts){

                if(err)
                    res.json(err.message);
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
                    res.json(err.message);
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
                    res.json(err.message);
                else if(posts.length==0)
                    res.json({"message":"No Posts Exists"});
                    else
                    res.json({posts});
            })
          }else{
              res.json({"message":"Please enter a search parameter."});
          }
    },
// showing the posts without the contact info of the users
   viewPostsOnly : function(req,res){

     Post.find({},function(err,posts){
       if(err)
         res.json(err.message);
         else if (posts.length ==0 )
           res.json("No posts , Yet ");
           else
             res.json({posts});
     })
   },

   // showing the posts alongside with the info of the useres made these posts
    viewPostsAndInfo : function(req,res){

      if (!req.body) {
                res.status(400).json("problem with the sent request");
                return;
            }
            var token = req.query.token ;
            if(!token){ //
              res.status(403).json("not loggedin ");  }
      else{
      Post.find({},function(err,allPosts){
        if(err)
          res.json(err.message);
          else if (allPosts.length == 0)
            res.json("No Posts , Yet");
            else{
          User.find({},function(err,allUsers){
            if(err) res.json(err.message);
            else  {
               res.json({allPosts,allUsers});
            }
          })
        }
      }); }
    },

    // Reviewing a Post . check Logged-in
       reviewPost : function(req , res){

         if (!req.body) {
                res.status(400).json("problem with the sent request");
                return;
            }
            var token = req.body.token ;
            if(!token){ //
              res.status(403).json("not loggedin ");  }

            else {
              var userMail=req.decoded._doc.email;
              var id = req.header("id");
              var vote = req.body.vote;

              Post.findOne({_id:id },function(err ,post){
                if(post == null ){
                  res.json("Post Doesn't Exist");
                  return;
                }
                else if (post.ownerEmail == userMail) {
                  res.json("You Own This Post so , You Can't Rate it ");
                  return ;
                }
                else if (post.raters.includes(userMail)) {
                  res.json("You Rated This Item Before");
                  return;
                }
                else {
                  if(vote == 0){
                    post.downVote++;
                    post.raters.push(userMail);
                    post.save(function(err, updated_post) {
                       if (err) res.status(403).json("can't update");
                       else
                           res.status(200).json("update succ downVoted");

                   })
                  }
                  else if (vote ==1) {
                    post.upVote++;
                    post.raters.push(userMail);
                    post.save(function(err, updated_post) {
                       if (err) res.status(403).json("can't update");
                       else
                           res.status(200).json("update succ upvoted");

                   })
                  }
                  else {
                    res.json("Not a Valid Vote");
                  }
                }
              });
            }
       },

    Sell_Post: function(req, res){  //sell
        //exceptions
        if(!req.body){
            res.status(400).json("problem with the sent request");
            return;
        }
        var token = req.body.token ;
        if(!token){
            res.status(403).json("not loggedin ");
        }else{ //check if logged    
            var owner_email=req.decoded._doc.email;
            let post = new Post(req.body);
            if(!owner_email || !post.type || !post.kind || !post.species||!post.gender||!post.price){
                res.status(403).json("incomplete request ");
                return;
            }
            if(post.type != 1){
                res.status(403).json("not the same type");
                return;
            }
            //
            if(isNaN(post.price))
            {
                res.status(403).json("price should be a number");
                return;
            }
            post.ownerEmail=owner_email;//save to owner's email
            post.save(function(err, Post){
                if (err){
                    res.status(403).json("problem inserting");
                }else{
                    res.json("done");
                }
            })
        }
    },

    Mate_Post: function(req, res) { //mate request
        //exceptions
        if(!req.body){
            res.status(400).json("problem with the sent request");
            return;
        }
        var token = req.body.token ;
        if(!token){ 
            res.status(403).json("not loggedin ");
        }else{
            //decoding token
            var owner_email=req.decoded._doc.email;
            let post = new Post(req.body);
            if(!owner_email || !post.type || !post.kind || !post.species||!post.gender){
                res.status(403).json("incomplete request ");
                return;
            }
            if(post.type != 3){
                res.status(403).json("not the same type");
                return;
            }
            post.ownerEmail=owner_email;//save to owner's email
            post.save(function(err, Post){
                if(err){
                    res.status(403).json("problem inserting");
                }else{
                    res.json("done");
                }
            })
        }
    },

    Shelter_Post: function(req, res){
        if (!req.body){
            res.status(400).json("INCOMING REQUEST ISNT CORRECT*DOESNT HAVE A BODY*");
            return;
        }
        var token = req.body.token ;
        if(!token){
            res.status(403).json("USER ISNT LOGGED IN ");
        }else{ // USER IS LOGGED IN
            var owner_email=req.decoded._doc.email;
            let post = new Post(req.body);
            if(!owner_email || !post.type || !post.kind || !post.species||!post.gender){
                res.status(403).json("REQUEST BODY ISNT COMPLETE ");
                return;
            }
            if(post.type != 2){
                res.status(403).json("TYPE ISNT =2 ");
                return;
            }
            //SAVING EMAIL COMING FROM THE TOKEN
            post.ownerEmail=owner_email;
            post.save(function(err, Post){
                if(err){
                    res.status(403).json("CANT ADD OWNER MAIL");
                }else{
                    res.json("SHELTER IS POSTED successfully");
                }
            })
        }
    },

    Found_Post: function(req, res){
        if(!req.body){
            res.status(400).json("INCOMING REQUEST ISNT CORRECT*DOESNT HAVE A BODY*");
            return;
        }
        var token = req.body.token;
        if(!token){
            res.status(403).json("USER ISNT LOGGED IN ");
        }else{
            var owner_email=req.decoded._doc.email;
            let post = new Post(req.body);
            if(!owner_email || !post.type || !post.kind || !post.species||!post.gender){
                res.status(403).json("REQUEST BODY ISNT COMPLETE ");
                return;
            }
            if(post.type != 5){
                res.status(403).json("TYPE ISNT =5 ");
                return;
            }
            post.ownerEmail=owner_email;
            post.save(function(err, Post){
                if(err){
                    res.status(403).json("CANT ADD OWNER MAIL");
                }else{
                    res.json("FOUND POST IS POSTED successfully");
                }
            })
        }
    },

    lost_Post: function(req, res){
        if(!req.body){
            res.status(400).json("INCOMING REQUEST ISNT CORRECT*DOESNT HAVE A BODY*");
            return;
        }
        var token = req.body.token ;
        if(!token){
            res.status(403).json("USER ISNT LOGGED IN ");
        }else{
            var owner_email=req.decoded._doc.email;
            let post = new Post(req.body);
            if(!owner_email || !post.type || !post.kind || !post.species||!post.gender){
                res.status(403).json("REQUEST BODY ISNT COMPLETE ");
                return;
            }
            if(post.type != 4){
                res.status(403).json("not the same type");
                return;
            }
            post.ownerEmail=owner_email;
            post.save(function(err, Post){
                if(err){
                    res.status(403).json("CANT ADD USER EMAIL");
                }else{
                    res.json("LOST POST successfully POSTED");
                }
            })
        }
    }
}

module.exports = postController;