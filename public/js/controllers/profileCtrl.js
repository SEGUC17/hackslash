angular.module('pettts')
.controller('profileController',function($scope,$http,profileService,$window){
    $scope.submitRate = function() {
        var rating = $scope.rate;
        var rated = $scope.userInfo.email;      
        profileService.rate(rating,rated,$scope);
    };
    
    profileService.view().then(function(response){
        $scope.userInfo = response.data.userProfileInfo;
        $scope.Posts = response.data.myPosts;
        $scope.myEmail = $window.sessionStorage.email;
    });
})