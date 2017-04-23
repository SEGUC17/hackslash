angular.module('pettts')

.factory('postsService', ['$http', function($http) {

  // This Service is used to connect the postsctrl to the API

    return {
      // Get Function is used to retrieve all the posts from the database .
        get: function() {
            return $http.get('/post/view')
                .then(function successCallback(res) {
                    return res.data.posts;
                });
        }
    }

}]);
