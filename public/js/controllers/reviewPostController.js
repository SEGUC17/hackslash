angular.module('pettts')


.controller('reviewPostController', function($scope, $http, reviewPostService){
        $scope.submitVote = function() {
        console.log($scope.formData.vote);
        reviewPostService.vote($scope.formData.vote);
    }
});
