angular.module('pettts')
    .controller('profileController', function($scope, $http, profileService, $window, $location, $routeParams) {
        $scope.givenUsername = $routeParams.username
        $scope.token = $window.sessionStorage.accessToken;
        $scope.myUsername = $window.sessionStorage.username;
        $scope.messageRated = $window.sessionStorage.messageRated;
        $scope.submitRate = function() {
            var rating = $scope.rateGiven;
            var rated = $scope.userInfo.email;
            var un = $scope.userInfo.username;
            if (rating > 5 || rating < 1) {
                $scope.message = "Rating must be between 1 and 5"
            } else {
                profileService.rate(rating, rated, un, $scope).then(function(response) {
                    $scope.messageRated = response.message;
                });
            }
        };

        $scope.submitEdit = function() {
            var edit = $scope.edit;
            profileService.edit(edit, $scope);
        };

        $scope.delete = function() {
            $scope.messagePass = undefined;
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

        $scope.passChange = function() {
            $scope.messageEmpty = undefined;
            $scope.messageError = undefined;
            $scope.messageNew = undefined;
            $scope.messageOld = undefined;
            var password = $scope.password;
            var verify = $scope.verify;
            var newPassword = $scope.newPassword;
            var verNewPassword = $scope.verNewPassword;
            if (password && newPassword) {
                if (newPassword == verNewPassword && newPassword.length > 5) {
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

        $scope.editPost = function() {
            $location.path('/post/edit').search({ id: $scope.post._id });
        }

        $scope.viewPost = function() {
            $location.path('/posts/viewMore').search({ id: $scope.post._id });
        }

        $scope.logout = function() {
            $window.sessionStorage.token = undefined;
        }


        profileService.view($scope.givenUsername).then(function(response) {
            $scope.success = response.success;
            $scope.userInfo = response.data.userProfileInfo;
            $scope.posts = response.data.myPosts;
            if ($scope.Posts == "||&This user has no Posts yet.&||") {
                $scope.Posts = undefined;
            }else{
                $scope.posts.sort(function(a, b) {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });
                $scope.pageSize = 7;
                $scope.currentPage = 1;
                $scope.maxSize = 5;
            }
            $scope.myEmail = $window.sessionStorage.email;
        });
    })
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