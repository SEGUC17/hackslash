var app = angular.module('pettts');

app.controller('pass_ctrl', function($scope, $http, $location, $window) {//forgetPassword //post
/*
$rootScope.$on("resUserX", function(event,data){ //getting the username from the broadcast on the root scope
  var userEmail=data; //userName from  the root scope
event.stopPropagation(); // removing the username from the the broadcast
}),*/


  $scope.reset = function() {
    $http.post('/forgetPassword',$scope.formData.email)
               .success(function (data, status, headers, config)   {
                   $scope.PostDataResponse = data;
               })
               .error(function (data, status, header, config) {
                   $scope.errorMessage = 'couldnt fire request to the api correctly';  ///for testing purposes
                   $scope.ResponseDetails = "Data: " + data +
                       "<hr />status: " + status +
                       "<hr />headers: " + header +
                       "<hr />config: " + config;
               });
  }
});
