angular.module('pettts')


.controller('reviewPostController', function($scope, $http, reviewPostService){
        $scope.submitVote = function() {
        console.log($scope.formData.vote.value);
        reviewPostService.vote($scope.formData.vote.value);
    }
});
