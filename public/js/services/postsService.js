angular.module('pettts')

  .factory('postsService', ['$http', function($http) {
    $window.location = '/profile/'+ $window.sessionStorage.username;
    var token = $window.sessionStorage.accessToken;
    if(!token)
      $window.location = '/login';
    else
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
