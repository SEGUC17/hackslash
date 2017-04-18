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

    $scope.passChange = function() {
        var password = $scope.password;
        var verify = $scope.verify;
        var newPassword = $scope.newPassword;
        var verNewPassword = $scope.verNewPassword;
        if(password && newPassword){
            if(password == verify && newPassword == verNewPassword && newPassword.length > 5){
                profileService.pass(password,newPassword,$scope);

            }else{
                console.log('error');
            }
        }else{
            console.log('Big error');
        }
    };

  
    profileService.view().then(function(response){
        $scope.userInfo = response.data.userProfileInfo;
        $scope.Posts = response.data.myPosts;
        $scope.myEmail = $window.sessionStorage.email;
    });
})
