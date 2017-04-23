angular.module('pettts')

//Services to connect with back end routes.
.factory('profileService', function($http, $window) {
    var userEmail = $window.sessionStorage.email;
    var userUsername = $window.sessionStorage.username;
    var userToken = $window.sessionStorage.accessToken;
    return {
        //Service to call viewProfile
        view: function(givenUsername) {
            var request = {
                method: 'GET',
                url: '/profile/view',
                headers: {
                    'x-access-token': userToken,
                    'username': givenUsername //TODO:REDIRECT TO DIFFERENT USERS
                }
            };
            return $http(request).then(function success(response) {
                if (response.data == "The user you're trying to view does not exist!") {
                    return {
                        'success': false,
                        'data': 'No User'
                    }
                } else {
                    return {
                        'success': true,
                        'data': response.data
                    };
                }
            }, function error(response) {
                return {
                    'success': false,
                    'message': 'Error can not view profile'
                };
            });
        },

        ////////////////////////////////////
        ///////////////////////////////////
        //Service to call rateUser
        rate: function(rating, rated, un, $scope) {
            var request = {
                method: 'POST',
                url: '/profile/rate',
                data: {
                    'remail': rated,
                    'rate': rating,
                    'token': userToken
                }
            };
            return $http(request).then(function success(response) {
                $window.location = '/profile/' + un;
            }, function error(response) {
                return {
                    'success': false,
                    'message': response.data.message
                };
            });
        },

        ////////////////////////////////////
        ///////////////////////////////////
        //Service to call deleteUser
        delete: function(password, $scope) {
            var request = {
                method: 'POST',
                url: '/profile/delete',
                data: {
                    'password': password,
                    'verify': password,
                    'token': userToken
                }
            };
            return $http(request).then(function success(response) {
                delete $window.sessionStorage.accessToken;
                delete $window.sessionStorage.email;
                delete $window.sessionStorage.username;
                $window.location = '/posts';
            }, function error(response) {
                return {
                    'success': false,
                    'message': 'error occured can not delete the user try again later'
                };
            });
        },
        ////////////////////////////////////
        ///////////////////////////////////
        //Service to call changePassword
        pass: function(password, newPassword, $scope) {
            var request = {
                method: 'POST',
                url: '/profile/pass',
                data: {
                    'password': password,
                    'verify': password,
                    'newPassword': newPassword,
                    'token': userToken
                }
            };
            return $http(request).then(function success(response) {
                $window.location = '/profile/' + userUsername;
            }, function error(response) {
                return {
                    'success': false,
                    'message': 'Error can not change password try again later'
                };
            });
        },
        ////////////////////////////////////
        ///////////////////////////////////
        //Service to call editProfile
        edit: function(user, $scope) {
            if (user) {
                var fd = new FormData();
                for (var key in user)
                    fd.append(key, user[key]);
                $http.post('/profile/edit', fd, {
                    transformRequest: angular.indentity,
                    headers: {
                        'Content-Type': undefined,
                        'x-access-token': userToken
                    }
                }).then(function success(response) {
                        //console.log(response);
                        console.log(user.username);
                        if (user.username && user.username.length > 0 || user.username != userUsername) {
                            console.log("true");
                            if (user && user.username)
                                $window.sessionStorage.username = user.username;
                            console.log($window.sessionStorage.username);
                            console.log(user.username);
                        }
                        $window.location = '/profile/' + $window.sessionStorage.username;

                    },
                    function error(response) {
                        $scope.messageUpload = response.data;

                    });
            }
        }
    }
});