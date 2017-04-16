var app = angular.module('pettts');

    app.controller('registerController', function($scope, $http, User) {

      $scope.submitUser = function() {

        var user = $scope.user;
        User.add(user);

      };
    });
