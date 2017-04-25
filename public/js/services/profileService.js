angular.module('pettts')

.factory('profileService', function($http, $window) {

    // This Service is used to connect the profilectrl to the API

    // attributes saved for the profile
    var userEmail = $window.sessionStorage.email;
    var userUsername = $window.sessionStorage.username;
    var userToken = $window.sessionStorage.accessToken;

    return {
        // View Function is used to retrieve the data of a user from the server .
        // to appears as the user's profile .
        view: function(givenUsername) {
            var request = {
                method: 'GET',
                url: '/profile/view',
                headers: {
                    'x-access-token': userToken,
                    'username': givenUsername
                }
            };
            return $http(request).then(function success(response) {
                // Ther is no existing user with this username .
                if (response.data == "The user you're trying to view does not exist!") {
                    return {
                        'success': false,
                        'data': 'No User'
                    }
                }
                // The profile of the user has been retrieved Successfully from the Server .
                else {
                    return {
                        'success': true,
                        'data': response.data
                    };
                }
            }, function error(response) {
                // An Error has occcured .
                return {
                    'success': false,
                    'message': 'Error can not view profile'
                };
            });
        },

        ////////////////////////
        ////////////////////////

        // Rate Function is used to send the rating that the user entered to another user .
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
                // the user has been rated Successfully .
                $window.location = '/profile/' + un;
            }, function error(response) {
                // An Error has occured .
                return {
                    'success': false,
                    'message': response.data.message
                };
            });
        },
        //Delete Function is used to delete the profile from the database .
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
                // All attributes saved in the sessions for this user will be deleted .
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

        ////////////////////////
        ////////////////////////

        //Pass Function is used to call changePassword
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
                // The Password has been changes .
                $window.location = '/profile/' + userUsername;
            }, function error(response) {
                // An Error occured .
                return {
                    'success': false,
                    'message': 'Error can not change password try again later'
                };
            });
        },

        ////////////////////////
        ////////////////////////

        //Edit Function is User to Edit the profile attributes in the database .
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
                        // Checking for username and its length .
                        if (user.username && user.username.length > 0 || user.username != userUsername) {
                            if (user && user.username)
                                $window.sessionStorage.username = user.username;
                        }
                        $window.location = '/profile/' + $window.sessionStorage.username;

                    },
                    function error(response) {
                        // An Error has occured .
                        $scope.messageUpload = response.data;

                    });
            }
        },

        ////////////////////////
        ////////////////////////

        // For logged in user view all his messages (only on his profile)
        getMessages: function() {
            //Initializing request
            var request = {
                method: 'GET',
                url: '/message/view',
                headers: {
                    'x-access-token': userToken
                }
            };
            return $http(request).then(function success(response) {
                //In case of success return all the user's messages
                return {
                    'success': true,
                    'message': response
                }
            }, function error(response) {
                //In case of failure return relevant error message.
                return {
                    'success': false,
                    'message': 'Error in request, please try again.'
                };
            });
        },

        ////////////////////////
        ////////////////////////

        // For sending a single message to the user whose profile is being viewed.
        sendMessage: function(messageWritten,senderUsername,receiverUsername) {
            //Initializing request
            var request = {
                method: 'POST',
                url: '/message/send',
                data: {
                    'messageContent': messageWritten,
                    'senderUsername': senderUsername,
                    'receiverUsername': receiverUsername,
                    'token': userToken
                }
            };
            return $http(request).then(function success(response) {
                //In case of success display success prompt
                return {
                    'success': true,
                    'message': 'Your message has been sent'
                };
            }, function error(response) {
                //In case of error display relevant error message
                return {
                    'success': false,
                    'message': 'Error in sending message to ' + givenUsername + '. Please, try again.'
                };
            });
        }
    }
});