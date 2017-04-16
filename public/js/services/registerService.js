var app = angular.module('pettts');

    app.factory('User', function($http) {
      return {
        add: function(user) {
          return $http.post('/register', user);
        }
      }
    })
