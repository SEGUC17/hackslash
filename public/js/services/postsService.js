angular.module('pettts')

  .factory('postsService', ['$http', function($http) {

    return {
    // get all posts
          get: function() {
              return $http.get('/post/view');
          },
          hao: "hao hao"
    }
}]);
