angular.module('pettts').service('index', ['$http', function($http) {

  // get all posts
        this.get = function() {
            return $http.get('/post/view');
        }
        this.hao = "hao";
}]);
