let Post = require('../models/post.js');
let User = require('../models/user.js');

let postController = {
    /// edit post
    editPost: function(req, res) {
        ////  get images               ////
        //handle exceptions
        if (!req.body || !req.query || !req.query.id) {
            res.status(400).json("error occured");
            return;
        }
        var token = req.headers['x-access-token'];
        if (!token) { //
            res.status(403).json("not loggedin ");
        } else {
            if (!req.decoded) {
                res.status(403).json("not loggedin ");
                return;
            }
            var ownerEmailDecoded = req.decoded._doc.email;
            var post = new Post(req.body.post);
            post.ownerEmail = ownerEmailDecoded;

            if (!post.type || !post.kind || !post.species || !post.gender) {
                res.status(403).json("incomplete request ");
                return;
            }
            if (post.type == 6 && (!post.speciesB || !post.kindB || !post.genderB || post.genderB == 'null')) {
                res.status(403).json("input problem with exchange type");
                return;
            }
            var id = req.query.id;
            Post.findOne({ _id: id, ownerEmail: ownerEmailDecoded }, function(err, foundPost) { //add ownerEmail here
                if (err) {
                    res.status(403).json("project not found or not your project");
                } else {
                    //no match exception
                    if (foundPost == null) {
                        res.status(403).json("post does not match with anything");
                        return
                    }
                    if (post.type) {
                        foundPost.type = post.type;
                    }
                    if (post.kind) {
                        foundPost.kind = post.kind;
                    }
                    if (post.species) {
                        foundPost.species = post.species;
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
                    if (post.price) {
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
                    foundPost.save(function(err, updatedPost) {
                        if (err) {
                            res.status(403).json("can't update");
                        } else {
                            res.status(200).json("update succ");
                        }
                    })
                }
            });
        }
    },
    // Searching posts by kind and species
    searchPosts: function(req, res) {
        var kindQuery = req.header("kind");
        var speciesQuery = req.header("species");
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
    filterPosts:function(req, res){
        var filterParam = req.params.type;
        var filterType ;
        switch(filterParam){
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
        var speciesQuery = req.header("species");
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
                        res.json({ "message": "No Posts Exists" });
                    } else {
                        res.json({ posts });
                    }
                }
            })
        } else if (kindQuery != undefined) {
            Post.find({ type: filterType, kind: { $regex: kindQuery } }, function(err, posts) {
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
            Post.find({ type: filterType, species: { $regex: speciesQuery } }, function(err, posts) {
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
                                res.status(200).json("update succ downVoted");
                            }
                        })
                    } else if (vote == 1) {
                        post.upVote++;
                        post.raters.push(userMail);
                        post.save(function(err, updatedPost) {
                            if (err) {
                                res.status(403).json("can't update");
                            } else {
                                res.status(200).json("update succ upvoted");
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

        if (!req.body) {
            res.status(400).json("problem with the sent request");
            return;
        }
        var token = req.headers['x-access-token'];

        if (!token) {
            res.status(403).json("not loggedin ");
        } else { //check if logged
            var ownerEmailDecoded = req.decoded._doc.email;
            let post = new Post(req.body.post);
            if (!ownerEmailDecoded || !post.type || !post.kind || !post.species || !post.gender || !post.price) {
                res.status(400).json("incomplete request ");
                return;
            }
            if (post.type != 1) {
                res.status(403).json("not the same type");
                return;
            }
            //
            if (isNaN(post.price)) {
                res.status(403).json("price should be a number");
                return;
            }
            post.ownerEmail = ownerEmailDecoded; //save to owner's email
            post.save(function(err, Post) {
                if (err) {
                    res.status(403).json("problem inserting");
                } else {
                    res.json("done");
                }
            })
        }
    },
    /// post type=> mate
    matePost: function(req, res) { //mate request
        //exceptions
        if (!req.body) {
            res.status(400).json("problem with the sent request");
            return;
        }
        var token = req.headers['x-access-token'];
        if (!token) {
            res.status(403).json("not loggedin ");
        } else {
            //decoding token
            var ownerEmailDecoded = req.decoded._doc.email;
            let post = new Post(req.body.post);
            if (!ownerEmailDecoded || !post.type || !post.kind || !post.species || !post.gender) {
                res.status(403).json("incomplete request ");
                return;
            }
            if (post.type != 3) {
                res.status(403).json("not the same type");
                return;
            }
            post.ownerEmail = ownerEmailDecoded; //save to owner's email
            post.save(function(err, Post) {
                if (err) {
                    res.status(403).json("problem inserting");
                } else {
                    res.json("done");
                }
            })
        }
    },
    /// post type=> shelter
    shelterPost: function(req, res) {
        if (!req.body) {
            res.status(400).json("INCOMING REQUEST ISNT CORRECT*DOESNT HAVE A BODY*");
            return;
        }
        var token = req.headers['x-access-token'];
        if (!token) {
            res.status(403).json("USER ISNT LOGGED IN ");
        } else { // USER IS LOGGED IN
            var ownerEmailDecoded = req.decoded._doc.email;
            let post = new Post(req.body.post);
            if (!ownerEmailDecoded || !post.type || !post.kind || !post.species || !post.gender) {
                res.status(403).json("REQUEST BODY ISNT COMPLETE ");
                return;
            }
            if (post.type != 2) {
                res.status(403).json("TYPE ISNT =2 ");
                return;
            }
            //SAVING EMAIL COMING FROM THE TOKEN
            post.ownerEmail = ownerEmailDecoded;
            post.save(function(err, Post) {
                if (err) {
                    res.status(403).json("CANT ADD OWNER MAIL");
                } else {
                    res.json("SHELTER IS POSTED successfully");
                }
            })
        }
    },
    /// post type=> found
    foundPost: function(req, res) {
        if (!req.body) {
            res.status(400).json("INCOMING REQUEST ISNT CORRECT*DOESNT HAVE A BODY*");
            return;
        }
        var token = req.headers['x-access-token'];
        if (!token) {
            res.status(403).json("USER ISNT LOGGED IN ");
        } else {
            var ownerEmailDecoded = req.decoded._doc.email;
            let post = new Post(req.body.post);
            if (!ownerEmailDecoded || !post.type || !post.kind || !post.species || !post.gender) {
                res.status(403).json("REQUEST BODY ISNT COMPLETE ");
                return;
            }
            if (post.type != 5) {
                res.status(403).json("TYPE ISNT =5 ");
                return;
            }
            post.ownerEmail = ownerEmailDecoded;
            post.save(function(err, Post) {
                if (err) {
                    res.status(403).json("CANT ADD OWNER MAIL");
                } else {
                    res.json("FOUND POST IS POSTED successfully");
                }
            })
        }
    },
    /// post type=> lost
    lostPost: function(req, res) {
        if (!req.body) {
            res.status(400).json("INCOMING REQUEST ISNT CORRECT*DOESNT HAVE A BODY*");
            return;
        }
        var token = req.headers['x-access-token'];
        if (!token) {
            res.status(403).json("USER ISNT LOGGED IN ");
        } else {
            var ownerEmailDecoded = req.decoded._doc.email;
            let post = new Post(req.body.post);
            if (!ownerEmailDecoded || !post.type || !post.kind || !post.species || !post.gender) {
                res.status(403).json("REQUEST BODY ISNT COMPLETE ");
                return;
            }
            if (post.type != 4) {
                res.status(403).json("not the same type");
                return;
            }
            post.ownerEmail = ownerEmailDecoded;
            post.save(function(err, Post) {
                if (err) {
                    res.status(403).json("CANT ADD USER EMAIL");
                } else {
                    res.json("LOST POST successfully POSTED");
                }
            })
        }
    },
    /// post type=> exchange
    exchangePost: function(req, res) {
        ////  get images               ////
        ////handle exceptions
        if (!req.body) {
            res.status(400).json("problem with the sent request");
            return;
        }
        var token = req.headers['x-access-token'];
        if (!token) { //
            res.status(403).json("not loggedin ");
        } else {
            //loggedin
            var ownerEmailDecoded = req.decoded._doc.email;
            let post = new Post(req.body.post); //handled the extra attributes are not considered
            if (!ownerEmailDecoded || !post.type || !post.kind || !post.species || !post.gender) {
                res.status(403).json("incomplete request ");
                return;
            }
            if (post.type != 6 || !post.speciesB || !post.kindB || !post.genderB) {
                res.status(403).json("not exchange post");
                return;
            }
            post.ownerEmail = ownerEmailDecoded; //save it with the new email ( from the token )
            post.save(function(err, Post) {
                if (err) {
                    res.status(403).json("problem inserting");
                } else {
                    res.json("done");
                }
            })
        }
    }
}

module.exports = postController;
