angular.module('pettts')

.factory('reviewPostService', function($http, $window) {

  // This Service is used to connect the reviewPostctrl to the API

    var token = $window.sessionStorage.accessToken;
    return {
      // Vote Function is used to send the required information with the type of vote
      // to the Server and Recieves the confirmation .
        vote: function(id, vote) {
            var value = 0;
            if (vote == "up") {
                value = 1;
            } else if (vote == "down") {
                value = 0;
            }

            var req = {
                method: 'POST',
                url: '/post/review',
                headers: {
                    'id': id
                },
                data: { 'vote': value, 'token': token }
            }
            return $http(req).then(function successCallback(response) {
              // The vote has been added Successfully .
                return response.data;
            }, function errorCallback(response) {
                // There is an Error occcured while connecting to the server .
                return response;
            });
        },

        ////////////////////////
        ////////////////////////

        // ViewPostInfo Function is used to get the  information about the Post
        // from the Server  .
        viewPostInfo: function(id) {
            var req = {
                method: 'GET',
                url: '/post/specificPost',
                headers: {
                    '_id': id
                }
            }
            return $http(req).then(function successCallback(response) {
                  // The data of the post has been retrieved Successfully from the Server .
                    return response;
                },
                function errorCallback(response) {
                  // There is an Error happened while connecting to the Server .
                    return response;
                }
            );
        },

        ////////////////////////
        ////////////////////////

        // ViewOwnerInfo Function is used to get the  information about the Owner of the Post
        // from the Server  .
        viewOwnerInfo: function(id) {
            var req = {
                method: 'GET',
                url: '/post/specificUser',
                headers: {
                    '_id': id
                }
            }
            return $http(req).then(function successCallback(response) {
              // The data of the owner of the post has been retrieved Successfully from the Server .
                    return response;
                },
                function errorCallback(response) {
                    // An Error has occured .
                    return response;
                }
            );
        }

    }
});
