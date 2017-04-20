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
                console.log(response);
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
                    'message': 'Error in service request'
                };
            });
        },

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
                console.log('wee');
                $window.location = '/profile/' + un;
            }, function error(response) {
                console.log('hah');
                console.log(response);
                return {
                    'success': false,
                    'message': response.data.message
                };
            });
        },
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
                $window.sessionStorage.accessToken = null;
                $window.sessionStorage.email = null;
                $window.location = '/posts';
            }, function error(response) {
                return {
                    'success': false,
                    'message': 'Error in service request'
                };
            });
        },
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
                    'message': 'Error in service request'
                };
            });
        },
        //Service to call editProfile
        edit: function(user, $scope) {
            if (user) {
                var request = {
                    method: 'POST',
                    url: '/profile/edit',
                    data: {
                        'username': user.username,
                        'firstName': user.firstName,
                        'middleName': user.middleName,
                        'lastName': user.lastName,
                        'phoneNumber1': user.phoneNumber1,
                        'phoneNumber2': user.phoneNumber2,
                        'homeNumber': user.homeNumber,
                        'token': userToken
                    }
                };
                return $http(request).then(function success(response) {
                    $window.location = '/profile/' + userUsername;
                }, function error(response) {
                    return {
                        'success': false,
                        'message': 'Error in service request'
                    };
                });
            }
        }
    }
});