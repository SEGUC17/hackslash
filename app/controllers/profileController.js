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

//Requiring bcrypt
var bcrypt = require('bcrypt');

//Require updateController
var updateController = require("./updateController");

let profileController = {
    //This function takes in the user's new information, and edits it.
    editProfile:function(req,res){
        if(!req.body)
        {
            res.status(400).json('There is a problem with your request.');
            return;
        }
        var token = req.body.token || req.header("token") || req.query.token;
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
        if(!req.body)
        {
            res.status(400).json('There is a problem with your request.');
            return;
        }
        var token = req.body.token || req.header("token") || req.query.token;
        if(!token)
        {
            res.json('You must be logged in to view profiles.')
        }else{
            //To add: if this is my profile, show edit button.
            var myEmail = req.decoded._doc.email;
            //var qUserName = req.query.username;
            var uEmail = req.header("email");
            //First, find this user.
            user.findOne({email:uEmail},function(err,userProfileInfo){
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
                        }else if(myPosts.length > 0){//View User's info and his posts.
                            var profileData = {userProfileInfo,myPosts};
                            res.status(200).json(profileData);
                        }else{//View User's info.
                            myPosts = "||&This user has no Posts yet.&||";
                            var profileData = {userProfileInfo,myPosts};
                            res.status(200).json(profileData);
                        }
                    })
                }else{//User not found. Send relevant error message.
                    res.json('The user you\'re trying to view does not exist!');
                }
            })
        }
    },
// This function allows users to rate other users.
    rateUser:function(req,res){

        var raterEmail = req.body.email;
        var ratedEmail = req.body.remail;//To set in post method.

        var found = false;
        
        if(!req.body)
        {
            res.status(400).json('There is a problem with your request.');
            return;
        }
        var token = req.body.token;
        if(!token)
        {
            res.status(400).json('You must be logged in.');
        }else{
        user.findOne({email:ratedEmail}, function(err,ratedFound){
            var alreadyRated = [];
            if(ratedFound){
                alreadyRated = ratedFound.raters;
                for(var i =0; i < alreadyRated.length ;i++)
                {
                    if(alreadyRated[i]==raterEmail)
                    {
                        found=true;
                        break;
                    }
                }
                if(found){
                    res.status(403).json('You have already rated this user.');
                }else{
                        user.findOne({email:raterEmail}, function(err,raterFound){
                            if(raterFound)
                            {
                                var sum = 0;
                                var given = req.body.rate;
                                var currentRate = ratedFound.rate;
                                var currentCount = ratedFound.count;

                                sum = currentRate*currentCount;
                                console.log(sum);
                                sum += parseFloat(given);
                                console.log(sum);

                                currentCount++;

                                var newRate = sum/currentCount;
                                console.log(newRate);

                                alreadyRated.push(raterEmail);

                                let updatedRated = new user({
                                    raters: alreadyRated,
                                    rate: newRate,
                                    count: currentCount,
                                    email: ratedEmail
                                })

                                updateController.updateProfile(updatedRated,res);
                            }else{
                                res.status(401).json('You must be logged in to rate users.');
                            }
                        })
                    }
                }else{
                    res.status(404).json('This user does not exist.');
                }
            })
        }
    },

    //This function allows the user to delete his/her profile.
    deleteUser:function(req,res){

        var email = req.body.email;
        if(!req.body)
        {
            res.status(400).json('There is a problem with your request.');
            return;
        }
        var token = req.body.token;
        if(!token)
        {
            res.status(400).json('You must be logged in.');
        }else{
            user.findOneAndRemove({email:email}, function(err){
                if(err){
                    console.log(err);
                    res.status(500).json('error');
             }else{
                    res.status(200).json('success');
                }
            })
        }
    },
    changePassword:function(req,res){
        if(!req.body)
        {
            res.status(400).json('There is a problem with your request.');
            return;
        }
        var token = req.body.token || req.header("token") || req.query.token;
        if(!token)
        {
            res.json('You must be logged in to change your password.')
        }else{
            var uEmail = req.decoded._doc.email;
            var uPassword = req.body.password;
            var uVerify = req.body.verify;
            var newPassword = req.body.newPassword;
            if(newPassword.length < 5)
            {
                res.status(300).json('Password too short');
                return;
            }
            if(uPassword == uVerify)
            {//Passwords match.
                //Find user
                user.findOne({email:uEmail},function(err,User){
                    if(err)
                    {
                        res.status(500).json('internal error');
                        return;
                    }
                    if(User)
                    {//User found. Check to see if entered password matches the saved one.
                        bcrypt.compare(uPassword, User.password, function(err, result) {
                            if(result)
                            {//Password matched.
                                bcrypt.genSalt(10, function(err, salt) {
                                    if(err)
                                    {
                                        throw err;
                                    }
                                    //Hash the new password.
                                    bcrypt.hash(newPassword, salt, function(err, hash){
                                        //Create a new user and update him.
                                        let edited = new user({
                                            email:uEmail,
                                            password:hash
                                        });
                                        updateController.updateProfile(edited,res);
                                    });
                                });
                            }else{//Password didn't match.
                                res.status(300).json('Wrong Password');
                            }
                        });
                    }else{//User not found.
                        res.status(404).json('User does not exit');
                    }
                })
            }else{//Password do not match.
                res.status(300).json('Passwords don\'t match.');
            }
        }
    }

}

//Export for the rest of the project.
module.exports = profileController;
