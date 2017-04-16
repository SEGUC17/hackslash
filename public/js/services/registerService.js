var app = angular.module('registerService', []);

    app.factory('User', function($http) {
      return $http.post('/register', user);
    })
