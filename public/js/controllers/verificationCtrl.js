var app = angular.module('pettts');

app.controller('verificationController', function($scope, $http, verificationService, $routeParams) {
    $scope.message = undefined;
    $scope.verificationToken = $routeParams.verification;
    verificationService.get($scope.verificationToken).then(function(response){
        $scope.message = response.message;
    })
});