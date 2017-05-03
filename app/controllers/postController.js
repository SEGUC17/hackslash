let Post = require('../models/post.js');
let User = require('../models/user.js');


var multer = require('multer');
var upload = multer({ dest: "public/images/postsGallery" });
var type = upload.single('postPic');
// file system
var fs = require('fs');
////////////////////////

/*
postController description
It should add and edit all types of the posts as well as search filter and getting post and owner information .
*/

let postController = {
    /// edit post
    editPost: function(req, res) {

        //handle exceptions

        ///handle not supported image file
        if (req.file) {
            var checkImage = req.file.originalname;
            checkImage = checkImage.substring(checkImage.length - 3, checkImage.length);
            if (checkImage != "png" && checkImage != "jpg") {
                fs.unlinkSync(req.file.path);
                res.status(403).json("you should upload an image with extension jpg or png only");
                return;
            }
        }
        if (req.body == undefined) {
            res.status(400).json("error occured");
            if (req.file)
                fs.unlinkSync(req.file.path);
            return;
        }
        var token = req.headers['x-access-token'];
        if (!token) { //
            res.status(403).json("not loggedin ");
            if (req.file)
                fs.unlinkSync(req.file.path);
        } else {
            if (!req.decoded) {
                res.status(403).json("not loggedin ");
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            var ownerEmailDecoded = req.decoded._doc.email;
            var post = new Post(req.body);
            post.ownerEmail = ownerEmailDecoded;
            var id = req.body.id;

            if (req.file)
                post.image = req.file.path;
            Post.findOne({ _id: id, ownerEmail: ownerEmailDecoded }, function(err, foundPost) { //add ownerEmail here
                if (err) {
                    res.status(403).json("project not found or not your project");
                    if (req.file)
                        fs.unlinkSync(req.file.path);
                } else {
                    //no match exception
                    if (foundPost == null) {
                        res.status(403).json("post does not match with anything");
                        if (req.file)
                            fs.unlinkSync(req.file.path);
                        return
                    }
                    if (post.type) {
                        foundPost.type = post.type;
                    }
                    if (post.kind) {
                        foundPost.kind = post.kind.toLowerCase();
                    }
                    if (post.species) {
                        foundPost.species = post.species.toLowerCase();
                    }
                    if (post.gender) {
                        foundPost.gender = post.gender;
                    }
                    if (post.kindB) {
                        foundPost.kindB = post.kindB;
                    }
                    if (post.speciesB) {
                        foundPost.speciesB = post.speciesB;
                    }
                    if (post.price && post.type == 1 && post.price > 0) {
                        foundPost.price = post.price;
                    }
                    if (post.description) {
                        foundPost.description = post.description;
                    }
                    if (post.note) {
                        foundPost.note = post.note;
                    }
                    if (post.genderB) {
                        foundPost.genderB = post.genderB;
                    }
                    foundPost.Date = Date.now;
                    if (post.type != 6) {
                        foundPost.speciesB = "";
                        foundPost.kindB = "";
                        foundPost.genderB = "null";
                    }
                    if (post.image) {
                        foundPost.image = post.image;
                    }
                    console.log(post);
                    foundPost.save(function(err, updatedPost) {
                        if (err) {
                            res.status(403).json("can't update");
                            if (req.file)
                                fs.unlinkSync(req.file.path);
                        } else {
                            res.status(200).json("update succ");
                        }
                    })
                }
            });
        }
    },
    // Deleting a Post
    deletePost: function(req, res) {
        //handle exceptions
        // if (req.body == undefined) {
        //     res.status(400).json("error occured");
        //     return;
        // }
        var token = req.headers['x-access-token'];
        if (!token) { //
            res.status(403).json("not loggedin ");
        } else {
            if (!req.decoded) {
                res.status(403).json("not loggedin ");
                return;
            }
            var ownerEmailDecoded = req.decoded._doc.email;
            var postID = req.headers['id'];
            Post.findOne({ _id: postID, ownerEmail: ownerEmailDecoded }, function(err, post) {
                if (err) {
                    res.status(403).json("Post not found or not your Post");
                } else {
                    if (!post) {
                        res.status(403).json("Post not found or not your Post");
                    } else {
                        post.remove({ _id: postID, ownerEmail: ownerEmailDecoded });
                        res.json({ "message": "The post has been deleted " });
                    }
                }
            });
        }
    },
    // Searching posts by kind and species
    searchPosts: function(req, res) {
        var kindQuery = req.header("kind");
        if (kindQuery != undefined)
            kindQuery = kindQuery.toLowerCase();
        var speciesQuery = req.header("species");
        if (speciesQuery != undefined)
            speciesQuery = speciesQuery.toLowerCase();
        if (kindQuery != undefined && speciesQuery != undefined) {
            Post.find({ kind: { $regex: kindQuery }, species: { $regex: speciesQuery } }, function(err, posts) {
                if (err) {
                    res.json(err.message);
                } else {
                    if (posts.length == 0) {
                        res.json({ "message": "No Posts Exists" });
                    } else {
                        res.json({ posts });
                    }
                }
            })
        } else if (kindQuery != undefined) {
            Post.find({ kind: { $regex: kindQuery } }, function(err, posts) {
                if (err) {
                    res.json(err.message);
                } else {
                    if (posts.length == 0) {
                        res.json({ "message": "No Posts Exists" });
                    } else {
                        res.json({ posts });
                    }
                }
            })
        } else if (speciesQuery != undefined) {
            Post.find({ species: { $regex: speciesQuery } }, function(err, posts) {
                if (err) {
                    res.json(err.message);
                } else {
                    if (posts.length == 0) {
                        res.json({ "message": "No Posts Exists" });
                    } else {
                        res.json({ posts });
                    }
                }
            })
        } else {
            res.json({ "message": "Please enter a search parameter." });
        }
    },
    // Filtering Posts by Type
    filterPosts: function(req, res) {
        var filterParam = req.params.type;
        var filterType;
        switch (filterParam) {
            case "buy":
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
                break;
        }
        Post.find({ type: filterType }, function(err, posts) {
            if (err) {
                res.json(err.message);
            } else {
                if (posts.length == 0) {
                    res.json({ message: "No Posts Exists" });
                } else {
                    res.json({ posts });
                }
            }
        })
    },
    // Filtering and Searching Posts as one method
    searchAndFilterPosts: function(req, res) {
        var filterType;
        var kindQuery = req.header("kind");
        if (kindQuery != undefined)
            kindQuery = kindQuery.toLowerCase();
        var speciesQuery = req.header("species");
        if (speciesQuery != undefined)
            speciesQuery = speciesQuery.toLowerCase();
        switch (req.header("filter")) {
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
                filterType = 1;
        }
        if (kindQuery != undefined && speciesQuery != undefined) {
            Post.find({ type: filterType, kind: { $regex: kindQuery }, species: { $regex: speciesQuery } }, function(err, posts) {
                if (err) {
                    res.json(err.message);
                } else {
                    if (posts.length == 0) {
                        res.status(404).json({ "message": "No Posts Exist" });
                    } else {
                        res.status(200).json({ posts });
                    }
                }
            })
        } else if (kindQuery != undefined) {
            Post.find({ type: filterType, kind: { $regex: kindQuery } }, function(err, posts) {
                if (err) {
                    res.json(err.message);
                } else {
                    if (posts.length == 0) {
                        res.status(404).json({ "message": "No Posts Exist" });
                    } else {
                        res.status(200).json({ posts });
                    }
                }
            })
        } else if (speciesQuery != undefined) {
            Post.find({ type: filterType, species: { $regex: speciesQuery } }, function(err, posts) {
                if (err) {
                    res.json(err.message);
                } else {
                    if (posts.length == 0) {
                        res.status(404).json({ "message": "No Posts Exist" });
                    } else {
                        res.status(200).json({ posts });
                    }
                }
            })
        } else {
            res.json({ "message": "Please enter a search parameter." });
        }
    },
    // showing the posts without the contact info of the users
    viewPostsOnly: function(req, res) {
        Post.find({}, function(err, posts) {
            if (err) {
                res.json(err.message);
            } else {
                if (posts.length == 0) {
                    res.json("No posts , Yet");
                } else {
                    res.json({ posts });
                }
            }
        })
    },
    // showing the posts alongside with the info of the useres made these posts
    viewPostsAndInfo: function(req, res) {
        if (!req.body) {
            res.status(400).json("problem with the sent request");
            return;
        }
        var token = req.query.token;
        if (!token) { //
            res.status(403).json("not loggedin ");
        } else {
            Post.find({}, function(err, allPosts) {
                if (err) {
                    res.json(err.message);
                } else if (allPosts.length == 0) {
                    res.json("No Posts , Yet");
                } else {
                    User.find({}, function(err, allUsers) {
                        if (err) {
                            res.json(err.message);
                        } else {
                            res.json({ allPosts, allUsers });
                        }
                    })
                }
            });
        }
    },
    // Reviewing a Post . check Logged-in
    reviewPost: function(req, res) {
        if (!req.body) {
            res.status(400).json("problem with the sent request");
            return;
        }
        var token = req.body.token;
        if (!token) { //
            res.status(403).json("not loggedin ");
        } else {
            var userMail = req.decoded._doc.email;
            var id = req.header("id");
            var vote = req.body.vote;

            Post.findOne({ _id: id }, function(err, post) {
                if (post == null) {
                    res.json("Post Doesn't Exist");
                    return;
                } else if (post.ownerEmail == userMail) {
                    res.json("You Own This Post so , You Can't Rate it ");
                    return;
                } else if (post.raters.includes(userMail)) {
                    res.json("You Rated This Item Before");
                    return;
                } else {
                    if (vote == 0) {
                        post.downVote++;
                        post.raters.push(userMail);
                        post.save(function(err, updatedPost) {
                            if (err) {
                                res.status(403).json("can't update");
                            } else {
                                res.status(200).json("you disliked this post");
                            }
                        })
                    } else if (vote == 1) {
                        post.upVote++;
                        post.raters.push(userMail);
                        post.save(function(err, updatedPost) {
                            if (err) {
                                res.status(403).json("can't update");
                            } else {
                                res.status(200).json("you liked this post");
                            }
                        })
                    } else {
                        res.json("Not a Valid Vote");
                    }
                }
            });
        }
    },
    /// post type=> sell
    sellPost: function(req, res) { //sell
        //exceptions


        ///handle not supported image file
        if (req.file) {
            var checkImage = req.file.originalname;
            checkImage = checkImage.substring(checkImage.length - 3, checkImage.length);
            if (checkImage != "png" && checkImage != "jpg") {
                fs.unlinkSync(req.file.path);
                res.status(403).json("you should upload an image with extension jpg or png only");
                return;
            }
        }
        if (!req.body) {
            res.status(400).json("problem with the sent request");
            if (req.file)
                fs.unlinkSync(req.file.path);
            return;
        }
        var token = req.headers['x-access-token'];

        if (!token) {
            res.status(403).json("not loggedin ");
            if (req.file)
                fs.unlinkSync(req.file.path);
        } else { //check if logged
            var ownerEmailDecoded = req.decoded._doc.email;
            let post = new Post(req.body);
            if (!ownerEmailDecoded || !post.type || !post.kind || !post.species || !post.gender || !post.price) {
                res.status(400).json("incomplete request ");
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            if (post.type != 1) {
                res.status(403).json("not the same type");
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            //
            if (isNaN(post.price) || post.price <= 0) {
                res.status(403).json("price should be a postive number");
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            post.ownerEmail = ownerEmailDecoded; //save to owner's email

            if (req.file)
                post.image = req.file.path;
            post.kind = post.kind.toLowerCase();
            post.species = post.species.toLowerCase();
            post.save(function(err, Post) {
                if (err) {
                    res.status(403).json("problem inserting");
                    if (req.file)
                        fs.unlinkSync(req.file.path);
                } else {
                    res.json("done");
                }
            })
        }
    },
    /// post type=> mate
    matePost: function(req, res) {
        //exceptions

        ///handle not supported image file
        if (req.file) {
            var checkImage = req.file.originalname;
            checkImage = checkImage.substring(checkImage.length - 3, checkImage.length);
            if (checkImage != "png" && checkImage != "jpg") {
                fs.unlinkSync(req.file.path);
                res.status(403).json("you should upload an image with extension jpg or png only");
                return;
            }
        }
        if (!req.body) {
            res.status(400).json("problem with the sent request");
            if (req.file)
                fs.unlinkSync(req.file.path);
            return;
        }
        var token = req.headers['x-access-token'];
        if (!token) {
            res.status(403).json("not loggedin ");
            if (req.file)
                fs.unlinkSync(req.file.path);
        } else {
            //decoding token
            var ownerEmailDecoded = req.decoded._doc.email;
            let post = new Post(req.body);
            if (!ownerEmailDecoded || !post.type || !post.kind || !post.species || !post.gender) {
                res.status(403).json("incomplete request ");
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            if (post.type != 3) {
                res.status(403).json("not the same type");
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            post.ownerEmail = ownerEmailDecoded; //save to owner's email

            if (req.file)
                post.image = req.file.path;
            post.kind = post.kind.toLowerCase();
            post.species = post.species.toLowerCase();
            post.save(function(err, Post) {
                if (err) {
                    res.status(403).json("problem inserting");
                    if (req.file)
                        fs.unlinkSync(req.file.path);
                } else {
                    res.json("done");
                }
            })
        }
    },
    /// post type=> shelter
    shelterPost: function(req, res) {

        ///handle not supported image file
        if (req.file) {
            var checkImage = req.file.originalname;
            checkImage = checkImage.substring(checkImage.length - 3, checkImage.length);
            if (checkImage != "png" && checkImage != "jpg") {
                fs.unlinkSync(req.file.path);
                res.status(403).json("you should upload an image with extension jpg or png only");
                return;
            }
        }
        if (!req.body) {
            res.status(400).json("INCOMING REQUEST ISNT CORRECT*DOESNT HAVE A BODY*");
            if (req.file)
                fs.unlinkSync(req.file.path);
            return;
        }
        var token = req.headers['x-access-token'];
        if (!token) {
            res.status(403).json("USER ISNT LOGGED IN ");
            if (req.file)
                fs.unlinkSync(req.file.path);
        } else { // USER IS LOGGED IN
            var ownerEmailDecoded = req.decoded._doc.email;
            let post = new Post(req.body);
            if (!ownerEmailDecoded || !post.type || !post.kind || !post.species || !post.gender) {
                res.status(403).json("REQUEST BODY ISNT COMPLETE ");
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            if (post.type != 2) {
                res.status(403).json("wrong post type ");
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            //SAVING EMAIL COMING FROM THE TOKEN
            post.ownerEmail = ownerEmailDecoded;

            if (req.file)
                post.image = req.file.path;
            post.kind = post.kind.toLowerCase();
            post.species = post.species.toLowerCase();
            post.save(function(err, Post) {
                if (err) {
                    res.status(403).json("cant save post");
                    if (req.file)
                        fs.unlinkSync(req.file.path);
                } else {
                    res.json("shelter post IS POSTED successfully");
                }
            })
        }
    },
    /// post type=> found
    foundPost: function(req, res) {

        ///handle not supported image file
        if (req.file) {
            var checkImage = req.file.originalname;
            checkImage = checkImage.substring(checkImage.length - 3, checkImage.length);
            if (checkImage != "png" && checkImage != "jpg") {
                fs.unlinkSync(req.file.path);
                res.status(403).json("you should upload an image with extension jpg or png only");
                return;
            }
        }
        if (!req.body) {
            res.status(400).json("INCOMING REQUEST ISNT CORRECT*DOESNT HAVE A BODY*");
            if (req.file)
                fs.unlinkSync(req.file.path);
            return;
        }
        var token = req.headers['x-access-token'];
        if (!token) {
            res.status(403).json("USER ISNT LOGGED IN ");
            if (req.file)
                fs.unlinkSync(req.file.path);
        } else {
            var ownerEmailDecoded = req.decoded._doc.email;

            let post = new Post(req.body);
            if (!ownerEmailDecoded || !post.type || !post.kind || !post.species || !post.gender) {
                res.status(403).json("REQUEST BODY ISNT COMPLETE ");
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            if (post.type != 5) {
                res.status(403).json("wrong post type ");
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            post.ownerEmail = ownerEmailDecoded;

            if (req.file)
                post.image = req.file.path;
            post.kind = post.kind.toLowerCase();
            post.species = post.species.toLowerCase();
            post.save(function(err, Post) {
                if (err) {
                    res.status(403).json("cant add post");
                    if (req.file)
                        fs.unlinkSync(req.file.path);
                } else {
                    res.json("FOUND POST IS POSTED successfully");
                }
            })
        }
    },
    /// post type=> lost

    lostPost: function(req, res) {



        ///handle not supported image file
        if (req.file) {
            var checkImage = req.file.originalname;
            checkImage = checkImage.substring(checkImage.length - 3, checkImage.length);
            if (checkImage != "png" && checkImage != "jpg") {
                fs.unlinkSync(req.file.path);
                res.status(403).json("you should upload an image with extension jpg or png only");
                return;
            }
        }
        if (!req.body) {
            res.status(400).json("INCOMING REQUEST ISNT CORRECT*DOESNT HAVE A BODY*");
            if (req.file)
                fs.unlinkSync(req.file.path);
            return;
        }
        var token = req.headers['x-access-token'];
        if (!token) {
            res.status(403).json("USER ISNT LOGGED IN ");
            if (req.file)
                fs.unlinkSync(req.file.path);
        } else {
            var ownerEmailDecoded = req.decoded._doc.email;
            let post = new Post(req.body);
            if (!ownerEmailDecoded || !post.type || !post.kind || !post.species || !post.gender) {
                res.status(403).json("REQUEST BODY ISNT COMPLETE ");
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            if (post.type != 4) {
                res.status(403).json("not the same type");
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            post.ownerEmail = ownerEmailDecoded;

            if (req.file)
                post.image = req.file.path;
            post.kind = post.kind.toLowerCase();
            post.species = post.species.toLowerCase();
            post.save(function(err, Post) {
                if (err) {
                    res.status(403).json("CANT ADD POST");
                    if (req.file)
                        fs.unlinkSync(req.file.path);
                } else {
                    res.json("LOST POST successfully POSTED");
                }
            })
        }
    },
    /// post type=> exchange
    exchangePost: function(req, res) {

        ////handle exceptions
        ///handle not supported image file
        if (req.file) {
            var checkImage = req.file.originalname;
            checkImage = checkImage.substring(checkImage.length - 3, checkImage.length);
            if (checkImage != "png" && checkImage != "jpg") {
                fs.unlinkSync(req.file.path);
                res.status(403).json("you should upload an image with extension jpg or png only");
                return;
            }
        }
        if (!req.body) {
            res.status(400).json("problem with the sent request");
            if (req.file)
                fs.unlinkSync(req.file.path);
            return;
        }
        var token = req.headers['x-access-token'];
        if (!token) { //
            res.status(403).json("not loggedin ");
            if (req.file)
                fs.unlinkSync(req.file.path);
        } else {
            //loggedin
            var ownerEmailDecoded = req.decoded._doc.email;
            let post = new Post(req.body); //handled the extra attributes are not considered
            if (!ownerEmailDecoded || !post.type || !post.kind || !post.species || !post.gender) {
                res.status(403).json("incomplete request ");
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            if (post.type != 6 || !post.speciesB || !post.kindB || !post.genderB) {
                res.status(403).json("not exchange post");
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            post.ownerEmail = ownerEmailDecoded; //save it with the new email ( from the token )
            if (req.file)
                post.image = req.file.path;
            post.kind = post.kind.toLowerCase();
            post.species = post.species.toLowerCase();
            post.save(function(err, Post) {
                if (err) {
                    res.status(403).json("cant add post");
                    if (req.file)
                        fs.unlinkSync(req.file.path);
                } else {
                    res.json("done");
                }
            })
        }
    },
    // get Post information by its id .
    findPostbyId: function(req, res) {
        var id = req.header("_id");
        Post.findOne({ _id: id }, function(err, foundPost) {
            if (err) {
                res.json("There's an Error finding this post");
            } else {
                if (foundPost == null) {
                    res.json("There is no post with this ID");
                } else {
                    res.json(foundPost);
                }
            }
        });
    },
    // get owner of the Post information by its id .
    findOwnerByPostID: function(req, res) {
        var neededEmail;
        var id = req.header("_id");
        Post.findOne({ _id: id }, function(err, foundPost) {
            if (err) {
                res.json("There's an Error finding this post");
                return;
            } else {
                if (foundPost == null) {
                    res.json("There is no post with this ID");
                    return;
                } else {
                    neededEmail = foundPost.ownerEmail;
                    User.findOne({ email: neededEmail }, function(err, foundUser) {
                        if (err) res.json("There's an error finding this person");
                        else {
                            if (foundUser == null) res.send("No Owner with this Email");
                            else {
                                res.json(foundUser.username);
                            }
                        }
                    });
                }
            }
        });
    },
    // client wants to report a post.
    report : function (req, res) {
      var id = req.body.id;
      var message = req.body.message;
      var email = req.decoded._doc.email;
      Post.findOne({ _id: id }, function(err, post) {
         if (err || !post) { res.json({success : false, message : "Something Wrong Happened."}); }
         else {
            var ownerEmail = post.ownerEmail;
            if(email == ownerEmail) {res.json({success : false, message : "You Can't Report you own Post."}); return;}
            var oldReports = post.reports;
            oldReports.forEach(function(report) {
               if (report.email == email) {res.json({success : false, message : "This user reported this post before."}); return;}
            });
            post.reports.push({'email' : email, 'message' : message});
            post.save();
            res.json({success : true, message : "Post Reported Successfully"});
         }
      });
   },
    // Admin wants to delete Reports of a Specific post.
    deleteReports : function (req, res) {
      var id = req.headers['id']; // post ID
      console.log(id);
      Post.findOne({ _id: id }, function(err, post) {
         if (err || !post) { res.json({success : false, message : "Something Wrong Happened."}); }
         else {
            post.reports = {};
            post.save();
            res.json({success : true, message : "Reports Deleted Successfully"});
         }
      });
    }
}

module.exports = postController;
