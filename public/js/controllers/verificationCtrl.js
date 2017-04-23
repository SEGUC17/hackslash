var app = angular.module('pettts');

app.controller('verificationController', function($scope, $http, verificationService, $routeParams) {

    $scope.message = undefined;
    $scope.verificationToken = $routeParams.verification;
    //send the verifiation token to the service to make the request
    verificationService.get($scope.verificationToken).then(function(response) {
        //set the result to the scope
        $scope.message = response.message;

    })
});