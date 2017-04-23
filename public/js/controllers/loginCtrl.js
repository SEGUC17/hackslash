var app = angular.module('pettts');

app.controller('loginCtrl', function($scope, $http, $location, $window) {


    ///check if logged in redirect to home
    if ($window.sessionStorage.accessToken) {
        $window.location = '/profile/' + $window.sessionStorage.username;
    }

    //if the forgot button was clicked
    $scope.forgot = function() {
            //getting user on the app scope to pass it later to other ctrlers
            $location.url('./forgotPassword'); // redirecting the user to the forgot password page

        },
        // if the submit button was clicked
        $scope.submit = function() {
            $http.post('/login', $scope.formData).then(function successCallback(response) {
                if (response.data.success === true) {
                    $window.sessionStorage.accessToken = response.data.token;
                    $window.sessionStorage.email = response.data.email;
                    $window.sessionStorage.username = response.data.username;
                    $scope.errorMessage = false;
                    // dont show an error (if it was there before)
                    // change the location to profile.html (where the profile is shown)
                    $window.location = '/profile/' + $window.sessionStorage.username;
                } else {
                    $scope.errorMessage = 'Wrong username or password';
                }
            }, function errorCallback(response) {
                $scope.errorMessage = 'Internal Error Happened , Please try again';
            });

        }
});