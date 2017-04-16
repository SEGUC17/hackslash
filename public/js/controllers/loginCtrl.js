var app = angular.module('pettts');

app.controller('loginCtrl', function($scope, $http, $location, $window) {

  //if the forgot button was clicked
$scope.forgot=function(){
  // try rootScope.$emit if isnt working
//  $rootScope.$broadcast('resUserX', $scope.formData.username );//getting user on the app scope to pass it later to other ctrlers
  $location.url('/forgot_password');// redirecting the user to the forgot password page

},
// if the submit button was clicked
    $scope.submit = function() {

        $http.post('/login', $scope.formData).then(function successCallback(response) {
            if (response.data.success == true) {
                // console.log(response.data);
                $window.sessionStorage.accessToken = response.data.token;
                $window.sessionStorage.email = response.data.email;
                $scope.errorMessage = false; // dont show an error (if it was there before)
                $window.location = '/index.html';
                // change the location to profile.html (where the profile is shown)
                // or to the home page
            } else {
                // console.log("user doesnt exist") ;
                $scope.errorMessage = 'Wrong username or password';
            }
        }, function errorCallback(response) {
            //  console.log("user doesnt exist") ;
            $scope.errorMessage = 'Wrong username or password';
        });

    }
});
