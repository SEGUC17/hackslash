angular.module('pettts')
    .controller('profileCtrl', function($scope, $http, profileService, $window, $location, $routeParams) {

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
            } else {
                //send the rate request to the corresponding service
                profileService.rate(rating, rated, un, $scope).then(function(response) {
                    //get the result back from the service and display it
                    $scope.messageRated = response.message;
                });
            }
        };

        ////////////////////////////////////
        ///////////////////////////////////

        //edit my profile
        $scope.submitEdit = function() {
            var edit = $scope.edit;
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
                if (newPassword == verNewPassword && newPassword.length >= 5) {
                    if (password == verify) {
                        if (password != newPassword) {
                            profileService.pass(password, newPassword, $scope);
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
        $scope.editPost = function() {
            $location.path('/post/edit').search({ id: $scope.post._id });
        }

        ////////////////////////////////////
        ///////////////////////////////////

        //view specific post
        $scope.viewPost = function() {
            $location.path('/posts/viewMore').search({ id: $scope.post._id });
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
        }

        ////////////////////////////////////
        ///////////////////////////////////

        // to send message
        $scope.sendMessage = function() {
            var content = $scope.content;
            var senderUsername = $scope.myUsername;
            var receiverUsename = $scope.givenUsername;
            if(content && content.length > 0 && content.length < 300){
                profileService.sendMessage(content, senderUsername, receiverUsename).then(function(response) {
                    $scope.messageIndicator = response.message;
                    $scope.content = null;
                });
            }else{
                $scope.messageIndicator = 'You have to write a message between 1 and 300 characters';
            }
        }

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
            $scope.fullMessages = [];
            $scope.messageSuccess = response.success;
            if ($scope.messageSuccess) {
                if(response.messagesContents && response.messagesContents.length > 0){
                    for (var i = 0; i < response.messagesContents.length; i++) {
                        var sender = response.messagesUsernames[i];
                        var content = response.messagesContents[i];
                        $scope.fullMessages.push({sender, content});
                    }
                }else{
                    $scope.messageFail = 'There are no message in your inbox yet.';
                }
            } else {
                $scope.messageFail = response.message;
            }
        })

    })


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