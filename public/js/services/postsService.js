angular.module('pettts')

  .factory('postsService', ['$http', function($http) {

    return {
      // get all posts
      get: function() {
          return $http.get('/post/view')
            .then(function successCallback(res){
              return res.data.posts;
            });
      }
    }

}]);
