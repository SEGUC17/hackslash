angular.module('pettts')
.controller('profileController',function($scope,$http,profileService,$window){
    $scope.submitRate = function() {
        var rating = $scope.rate;
        var rated = $scope.userInfo.email;
        profileService.rate(rating,rated,$scope);
    };
    
    $scope.submitEdit = function() {
        var edit = $scope.edit;
        profileService.edit(edit,$scope);
    };

    $scope.delete = function() {
        var password = $scope.dPassword;
        var verify = $scope.dVerify;
        if(password){
            if(password == verify){
                profileService.delete(password,$scope);
            }else{
                console.log('error');
            }
        }else{
            console.log('Big error');
        }
    };
})