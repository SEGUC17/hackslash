angular.module('indexService', []).factory('index', ['$http', function($http) {

  // get all posts
  return {

        get : function() {
            return $http.get('/post/view');
        }

}]);
