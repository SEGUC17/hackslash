var app = angular.module('pettts');

app.controller('pass_ctrl', function($scope, $http, $location, $window) {//forgetPassword //post
/*
$rootScope.$on("resUserX", function(event,data){ //getting the username from the broadcast on the root scope
  var userEmail=data; //userName from  the root scope
event.stopPropagation(); // removing the username from the the broadcast
}),*/

  $scope.submit=function(){ // submitting the new password
    $http.post('/resetPassword',$scope.formData.newPassword)
               .success(function (data, status, headers, config)   {
                   $scope.PostDataResponse = data;
                   $scope.status=status;
                   $location.url('/index.html') // redirecting him to index page after reseting his pass successfully
                      $scope.errorMessage =false; // for testing purposes
               })
               .error(function (data, status, header, config) {
                   $scope.errorMessage = 'Token expired lease try again ';  ///for testing purposes
                   $scope.ResponseDetails = "Data: " + data +
                       "<hr />status: " + status +
                       "<hr />headers: " + header +
                       "<hr />config: " + config;
               });
    },

  $scope.reset = function() {// asking for the reset password form
    $http.post('/forgetPassword',$scope.formData.email)
               .success(function (data, status, headers, config)   {
                   $scope.PostDataResponse = data;
                   $scope.status=status;
                   $scope.errorMessage =false;
               })
               .error(function (data, status, header, config) {
                   $scope.errorMessage = 'Wrong Email' ;                            ///for testing purposes
                   $scope.ResponseDetails = "Data: " + data +
                       "<hr />status: " + status +
                       "<hr />headers: " + header +
                       "<hr />config: " + config;
               });
  }
});
