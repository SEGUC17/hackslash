angular.module('pettts')

.factory('filterService', ['$http', function($http) {

    return {
        // get all posts
        get: function(type) {
            return $http.get('/post/filter/' + type)
                .then(function successCallback(res) {
                    return res.data.posts;
                });
        }
    }

}]);