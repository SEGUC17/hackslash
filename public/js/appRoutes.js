angular.module('pettts')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider

            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
            .when('/posts', {
                templateUrl: 'views/posts.html',
                controller: 'postsController'
            })
            .when('/post/new', {
                templateUrl: 'views/addPost.html',
                controller: 'postController'
            })
				    .when('/post/edit', {
			                templateUrl: 'views/editPost.html',
			                controller: 'postController'
			            })

						// filter posts router
						.when('/posts/:type', {
							templateUrl: 'views/filter.html',
							controller: 'filterController'
						})

            .when('/posts/search', {
              templateUrl: 'views/search.html',
              controller: 'searchController'
            })

		$locationProvider.html5Mode(true);

}]);
