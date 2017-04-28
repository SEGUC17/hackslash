angular.module('pettts')
    .controller('profileCtrl', function($scope, $http, profileService, $window, $location, $routeParams, $timeout, reviewPostService) {

        //get the attributes for the username to visit, my username and the token
        $scope.givenUsername = $routeParams.username
        $scope.token = $window.sessionStorage.accessToken;
        $scope.myUsername = $window.sessionStorage.username;
        ////////////////////////////////////
        ///////////////////////////////////

        //rate the user
        $scope.submitRate = function() {
            var rating = $scope.rateGiven;
            var rated = $scope.userInfo.email;
            var un = $scope.userInfo.username;
            //check for the rating value
            if (rating > 5 || rating < 1) {
                $scope.message = "Rating must be between 1 and 5"
                    //for the message to disappear
                $timeout(function() { $scope.message = undefined }, 4000);
            } else {
                //send the rate request to the corresponding service
                profileService.rate(rating, rated, un, $scope).then(function(response) {
                    //get the result back from the service and display it
                    $scope.messageRated = response.message;
                    //for the message to disappear
                    $timeout(function() { $scope.messageRated = undefined }, 4000);
                });
            }
        };

        ////////////////////////////////////
        ///////////////////////////////////

        //edit my profile
        $scope.submitEdit = function() {
            $scope.messageUpload = undefined;
            var edit = $scope.edit;
            //Check if phone number(s) entered have valid characters (+12345... or (12)345... or 12345... or 12-345...)
            //Regular expression that contains '+', '-', '(', ')', ' ' and numbers.
            var regex = /^[\d ()+-]+$/;
            if (edit) {
               //Check on Phone number 1 (if provided)
                if($scope.edit.phoneNumber1){
                    if(!regex.test($scope.edit.phoneNumber1)){
                        $scope.messageUpload = "Invalid phone number in field Phone number 1. It should only contain numbers, '+', '(', ')' and '-'.";
                        return;
                    }else if($scope.edit.phoneNumber1.length > 25){
                        $scope.messageUpload = "Your phone number (Phone number 1) can't be longer than 25 characters!";
                        return;
                    }
                }
                //Check on Phone number 2 (if provided)
                if($scope.edit.phoneNumber2){
                    if(!regex.test($scope.edit.phoneNumber2)){
                        $scope.messageUpload = "Invalid phone number in field Phone number 2. It should only contain numbers, '+', '(', ')' and '-'.";
                        return;
                    }else if($scope.edit.phoneNumber2.length > 25){
                        $scope.messageUpload = "Your phone number (Phone number 2) can't be longer than 25 characters!";
                        return;
                    }
                }
                //Check on Home number (if provided)
                if($scope.edit.homeNumber){
                    if(!regex.test($scope.edit.homeNumber)){
                        $scope.messageUpload = "Invalid phone number in field Home number. It should only contain numbers, '+', '(', ')' and '-'.";
                        return;
                    }else if($scope.edit.homeNumber.length > 25){
                        $scope.messageUpload = "Your phone number (Home number) can't be longer than 25 characters!";
                        return;
                    }
                }
                //Check on username (if provided)
                if($scope.edit.username){
                    if($scope.edit.username.length > 30 || $scope.edit.username.length < 5){
                        $scope.messageUpload = "Invalid username. It must be between 5 and 30 characters long.";
                        return;
                    }
                }
                //Check on first name (if provided)
                if($scope.edit.firstName){
                    if($scope.edit.firstName.length > 30 || $scope.edit.firstName.length < 1){
                        $scope.messageUpload = "Invalid first name. It must be between 1 and 30 charcters long";
                        return;
                    }
                }
                //Check on last name (if provided)
                if($scope.edit.lastName){
                    if($scope.edit.lastName.length > 30 || $scope.edit.lastName.length < 1){
                        $scope.messageUpload = "Invalid last name. It must be between 1 and 30 charcters long";
                        return;
                    }
                }
                //Check on middle name (if provided)
                if($scope.user.middleName){
                    if($scope.user.middleName.length > 30 || $scope.user.middleName.length < 1){
                        $scope.message = "Invalid middle name. It must be between 1 and 30 charcters long";
                        return;
                    }
                }
            }else{
                $scope.messageUpload = "Please choose something to edit";
                return;
            }
            //Submit user to be edited
            profileService.edit(edit, $scope);
        };

        ////////////////////////////////////
        ///////////////////////////////////

        //delete my profile and run away!!!
        $scope.delete = function() {
            //message for pasword and its confirmation matching error
            $scope.messagePass = undefined;
            //message for the password when not given
            $scope.messageNotGiven = undefined;

            var password = $scope.dPassword;
            var verify = $scope.dVerify;
            if (password) {
                if (password == verify) {
                    profileService.delete(password, $scope);
                } else {
                    $scope.messagePass = 'Your passwords don\'t match.';
                }
            } else {
                $scope.messageNotGiven = 'You need to enter your password.';
            }
        };

        ////////////////////////////////////
        ///////////////////////////////////

        //change my password
        $scope.passChange = function() {

            //error messages for changing the password
            $scope.messageEmpty = undefined;
            $scope.messageError = undefined;
            $scope.messageNew = undefined;
            $scope.messageOld = undefined;
            var password = $scope.password;
            var verify = $scope.verify;
            var newPassword = $scope.newPassword;
            var verNewPassword = $scope.verNewPassword;

            //checks for various input errors by user
            if (password && newPassword) {
                if (newPassword == verNewPassword) {
                    if (password == verify) {
                        if (password != newPassword) {
                            if(newPassword.length >= 5) {
                                profileService.pass(password, newPassword, $scope);
                            }else{
                                $scope.messageError = "Your password needs to be at least 5 characters in length.";
                            }
                        } else {
                            $scope.messageError = "Your old and new passwords need to be different.";
                        }
                    } else {
                        $scope.messageOld = "Your old password doesn't match.";
                    }
                } else {
                    $scope.messageNew = "Your new password doesn't match.";
                }
            } else {
                $scope.messageEmpty = "Please enter both your old and new passwords.";
            }
        };

        ////////////////////////////////////
        ///////////////////////////////////
        //edit my post
        $scope.editPost = function(id) {
            $location.path('/post/edit').search({ id });
        };

        ////////////////////////////////////
        ///////////////////////////////////

        //view specific post
        $scope.viewPost = function() {
            $location.path('/posts/viewMore').search({ id: $scope.post._id });
        };

        ////////////////////////////////////
        ///////////////////////////////////

        //delete specific post
        $scope.deletePost = function(id) {
            var un = $scope.userInfo.username;

            profileService.deletePost($scope, id, un);
        }

        ////////////////////////////////////
        ///////////////////////////////////

        //logout and say bye
        $scope.logout = function() {
            delete $window.sessionStorage.accessToken;
            delete $window.sessionStorage.email;
            delete $window.sessionStorage.username;
            delete $scope.token;
            $window.location = '/';
        };

        ////////////////////////////////////
        ///////////////////////////////////

        // to send message
        $scope.sendMessage = function() {
            var content = $scope.content;
            var senderUsername = $scope.myUsername;
            var receiverUsename = $scope.givenUsername;
            if (content && content.length > 0 && content.length < 301) { //Check message validity, and send it.
                profileService.sendMessage(content, senderUsername, receiverUsename).then(function(response) {
                    $scope.messageIndicator = response.message;
                    $scope.content = null;
                    $timeout(function() { $scope.messageIndicator = undefined }, 4000);
                });
            } else { //In case of empty message or one that is too large.
                $scope.messageIndicator = 'You have to write a message between 1 and 300 characters';
                $timeout(function() { $scope.messageIndicator = undefined }, 4000);

            }
        };

        ////////////////////////////////////
        ///////////////////////////////////

        // to go to the sender's profile
        $scope.goToProfile = function(senderUsername) {
            $window.location = '/profile/' + senderUsername;
        };

        ////////////////////////////////////
        ///////////////////////////////////

        // to view my profile
        profileService.view($scope.givenUsername).then(function(response) {
            $scope.success = response.success;
            // get the values back from the service
            if (response.data) {
                $scope.userInfo = response.data.userProfileInfo;
                $scope.posts = response.data.myPosts;
                if (response.data.userProfileInfo) {
                    //check if my profile or not
                    if ($scope.givenUsername == $window.sessionStorage.username) {
                        $scope.myProfile = "yes";
                    }
                    //check for profile picture
                    if (response.data.userProfileInfo.profilePicture) {
                        // formulate the profile picture path
                        $scope.profilePicture = response.data.userProfileInfo.profilePicture.substring(7, response.data.userProfileInfo.profilePicture.length);
                    }
                }
                if ($scope.posts == "||&This user has no Posts yet.&||") {
                    //if the user has no posts
                    $scope.posts = undefined;
                } else if ($scope.posts) {
                    //sort the posts by date
                    $scope.posts.sort(function(a, b) {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    });

                    // put the username of the user who posted in each post
                    $scope.posts.forEach(function(post) {
                        reviewPostService.viewOwnerInfo(post._id).then(function(response) {
                            post.username = response.data
                        });
                    });

                    $scope.submitVote = function(id, vote) {
                        reviewPostService.vote(id, vote).then(function(response) {
                            $scope.postMessage = response;
                            // for message to disappear 
                            $timeout(function() { $scope.postMessage = undefined }, 4000);
                        })
                    }

                    $scope.goTo = function(path) {
                        $location.path('/' + path);
                    }

                    $scope.visitProfile = function(username) {
                        $location.path('/profile/' + username);
                    }

                    //set page attributes
                    $scope.pageSize = 7;
                    $scope.currentPage = 1;
                    $scope.maxSize = 5;
                }
                $scope.myEmail = $window.sessionStorage.email;
            }
        });

        ////////////////////////////////////
        ///////////////////////////////////

        // to view my messages
        profileService.getMessages().then(function(response) {
            $scope.messageFail = undefined;
            //Create an empty array to hold all the messages and senders combined.
            $scope.fullMessages = [];
            $scope.messageSuccess = response.success;
            if ($scope.messageSuccess) { //Messages sent back successfully.
                if (response.messagesContents && response.messagesContents.length > 0) {
                    for (var i = 0; i < response.messagesContents.length; i++) {
                        var sender = response.messagesUsernames[i];
                        var content = response.messagesContents[i];
                        $scope.fullMessages.push({ sender, content });
                    }
                    //Order the array (Most recent first).
                    $scope.fullMessages.reverse();
                } else { //Recieved no messages yet.
                    $scope.messageFail = 'There are no message in your inbox yet.';
                }
            } else { //Other errors
                $scope.messageFail = response.message;
            }
        });
    });


////////////////////////////////////
///////////////////////////////////

//directive for file upload in edit profile

app.directive('ngFileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.ngFileModel);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);

                });
            });
        }
    };
}]);