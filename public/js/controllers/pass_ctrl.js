var app = angular.module('pettts');

app.controller('pass_ctrl', function($scope, $http, $location, $window) {//forgetPassword //post
/*
$rootScope.$on("resUserX", function(event,data){ //getting the username from the broadcast on the root scope
  var userEmail=data; //userName from  the root scope
event.stopPropagation(); // removing the username from the the broadcast
}),*/

//console.log($scope.email);

       $scope.submit=function(){ // submitting the new password

         $http.post('/resetPassword',$scope.formData).then(function successCallback(response) {
             // this callback will be called asynchronously
             // when the response is available


             if(response.data.success==true){
               console.log("password was changed succesfully");
           //    $window.alert="please check your email for the  password reset link";


             }else{
               console.log("couldnt updatepass");
               console.log("frombackend1:"+ response.message);

     //  $window.alert="Something Went Wrong  ,, please Try Again";
             }
           }, function errorCallback(response) {
             console.log("frombackend2:"+response.message);
             // called asynchronously if an error occurs
             // or server returns response with an error status.
     //  $window.alert="Something Went Wrong  ,, please Try Again";
           });

    },



       $scope.reset = function() {// asking for the reset password form
      console.log("entered reset");
       console.log($scope.formData);

    $http.post('/forgetPassword',$scope.formData).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        if(response.data.success==true){
          console.log("mail sent successfully");
      //    $window.alert="please check your email for the  password reset link";

        }else{
          console.log("coudlnt send mail");
          console.log("from back end1 :"+ response.message);

//  $window.alert="Something Went Wrong  ,, please Try Again";


        }
      }, function errorCallback(response) {
        console.log("from back end2 :"+response.message);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
//  $window.alert="Something Went Wrong  ,, please Try Again";
      });


  }
});
