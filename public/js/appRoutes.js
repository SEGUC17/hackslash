angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// posts page
		.when('/', {
			templateUrl: 'views/index.html',
			controller: 'indexCtrl'
		})

	$locationProvider.html5Mode(true);

}]);
