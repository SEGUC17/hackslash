//Multer
var multer = require('multer');
var workData = multer({dest:'views/uploads'});
var type = workData.single('upload');
var fileStream = require('fs');

//Connecting to JS defined Schema.
let user = require('../models/user');
let post = require('../models/post');

//Require Middleware
var middleware = require("../middleware");

//Require updateController
var updateController = require("./updateController");

let profileController = {
    //This function takes in the user's new information, and edits it.
    editProfile:function(req,res){
        var token = req.body.token;
        if(!token){
            res.json('You must be logged in to edit your profile.')
        }else{
            //Create a new user with all the new features (The unchanged ones are null)
            let edited = new user({
                email:req.decoded._doc.email,
                username:req.body.username,
                firstName:req.body.firstName,
                middleName:req.body.middleName,
                lastName:req.body.lastName,
                phoneNumber1:req.body.phoneNumber1,
                phoneNumber2:req.body.phoneNumber2,
                homeNumber:req.body.homeNumber
            });
            //For profile picture only
            var targetPath = "";
            if(!req.file)
            {
                targetPath = "views/uploads/default.jpg";
            }else{
                targetPath = 'views/uploads/' + req.file.originalname;
                var file = fileStream.createReadStream(req.file.path);
                var final = fileStream.createWriteStream(targetPath);
                file.pipe(final);
                fileStream.unlink(req.file.path);
            }
            if(targetPath != "views/uploads/default.jpg")
            {
                edited.profilePicture = targetPath;
            }
            //Updating the user.
            updateController.updateProfile(edited,res);
        }
    },
    //This function takes in the desired user's email, an views all relevant information.
    viewProfile:function(req,res){
        var token = req.body.token;
        if(!token)
        {
            res.json('You must be logged in to view profiles.')
        }else{
            //To add: if this is my profile, show edit button.
            var myEmail = req.decoded._doc.email;
            //var qUserName = req.query.username;
            var uEmail = req.header("email");
            //First, find this user.
            user.findOne({email:uEmail/*,password:uPassword*/},function(err,userProfileInfo){
                if(err)
                {//Internal Error
                    console.log('error in viewProfile');
                    res.status(500).json(err.message);
                }else if(userProfileInfo){//User found.
                    post.find({ownerEmail:uEmail},function(err,myPosts){//Find his posts as well.
                        if(err)
                        {//Internal Error
                            console.log('error in viewProfile');
                            res.status(500).json(err.message);
                        }else if(myPosts){//View User's info and his posts.
                            var profileData = {userProfileInfo,myPosts};
                            res.status(200).json(profileData);
                        }else{//View User's info.
                            myPosts = "||&This user has no Posts yet.&||";
                            var profileData = {userProfileInfo,myPosts};
                            res.status(200).json('profileData');
                        }
                    })
                }else{//User not found. Send relevant error message.
                    res.json('The user you\'re trying to view does not exist!');
                }
            })
        }
    },
    changePassword:function(req,res){
        var token = req.body.token;
        if(!token)
        {
            res.json('You must be logged in to view profiles.')
        }else{
            var uEmail = req.decoded._doc.email;
            var uPassword = req.body.password;
            var uVerify = req.body.verify;
            if(uPassword == uVerify)
            {
                let edited = new User({
                    email:uEmail,
                    password:newPassword
                });
                updateController.updateProfile(edited,res);
            }else{
                res.status(300).json('Passwords don\'t match.');
            }
        }
    }
}

//Export for the rest of the project.
module.exports = profileController;