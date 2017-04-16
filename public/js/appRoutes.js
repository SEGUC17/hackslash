angular.module('pettts')

	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

		$routeProvider

			// posts page
			.when('/posts', {
				templateUrl: 'views/posts.html',
				controller: 'postsController'
			})

			// filter posts router
			.when('/posts/:type', {
				templateUrl: 'views/filterPosts.html',
				controller: 'filterController'
			})

		$locationProvider.html5Mode(true);

}]);
