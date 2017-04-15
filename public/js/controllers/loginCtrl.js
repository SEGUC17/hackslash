var app = angular.module('pettts');

app.controller('loginCtrl',function($scope, $http ,$location ,  $window) {

	$scope.submit = function () {
		$http.post('/login',$scope.formData).then(function successCallback(response) {
			if(response.data.success == true) {
				console.log("user exits");
				$window.sessionStorage.accessToken = response.token;
				$window.sessionStorage.username = $scope.formData.username;

				$scope.errorMessage = false;// dont show an error (if it was there before)
				$window.location = '/index.html';
				// change the location to profile.html (where the profile is shown)
				// or to the home page
			}
			else {
					console.log("user doesnt exist") ;
					$scope.errorMessage = 'Wrong username or password';
			}
		 }, function errorCallback(response) {
			 console.log("user doesnt exist") ;
			 $scope.errorMessage = 'Wrong username or password';
		 });

	}

	$scope.forgot = function () {

	}
});
