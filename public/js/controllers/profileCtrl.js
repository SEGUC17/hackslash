angular.module('pettts')
.controller('profileController',function($scope,$http,profileService,$log){
    profileService.view().then(function(data){
        $scope.nice = data;
    })
})