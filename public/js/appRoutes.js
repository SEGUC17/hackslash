angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// posts page
		.when('/', {
			templateUrl: 'views/index.html',
			controller: 'indexCtrl'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'loginCtrl'
		})

	$locationProvider.html5Mode(true);

}]);
