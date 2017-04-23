angular.module('pettts')
.factory('filterService', ['$http', function($http) {

  // This Service is used to connect the filterctrl to the API

    return {
        // Get method to filter the posts with the type while retrieving posts from the database .
        get: function(type) {
            return $http.get('/post/filter/' + type)
                .then(function successCallback(res) {
                    return res.data.posts;
                });
        }
    }

}]);
