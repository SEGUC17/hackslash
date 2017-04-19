var app = angular.module('pettts');

app.controller('pass_ctrl', function($scope, $http, $location, $window,$routeParams) {


  $scope.pop=function(){ //USER CLICKED ON CHANGE PASSWORD BUTTON IN RESET PASSWORD PAGE

    //FIRING RESET PASSWORD REQUEST TO THE BACK END API
    $http.post('/resetPassword',{ params:{'token':$routeParams,'password':$scope.formData}}).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      if(response.data.success==true){// IF PASSWORD WAS succesfully changed it will redirect him to the login page
        $window.alert("Password has been change succesfully,,, Redirecting you to login page");
        $window.location = '/login';
      }else{// IF THE PASSWORD WASNT SUCCESSFULLY cHAGNED IT REDIRECTS HIM TO THE FORGOT PASSWORD PAGE
        $window.alert("Something Went Wrong  ,, please Try Again");
        $window.location = '/forgotPassword';
      }
    }, function errorCallback(response) {
      console.log(response.message);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

  },

  $scope.reset = function() {// USER CLICKED ON RESET PASSWORD BUTTON IN FORGOT PASSWORD PAGE

    // FIRING FORGET PASSWORD REQUEST TO THE BACK END API
    $http.post('/forgetPassword',$scope.formData).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      if(response.data.success==true){// IF THE PASSWORD RESET LINK WAS SUCCESSFULLY SENT TO USER IT ALERTS HIM
        $window.alert("Password Reset Link has been sent to your email");
      }else{// IF THE MAIL MAIL WASNT SENT IT ALERTS THE USER TO TRY AGAIN
        $window.alert("Something Went Wrong  ,, please Try Again");
        console.log(response.message);
      }
    }, function errorCallback(response) {
      console.log(+response.message);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }
});
