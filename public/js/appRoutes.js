angular.module('pettts')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'registerController'
            })
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
            .when('/profile', {
                templateUrl: 'views/profile.html',
                controller: 'profileController'
            })
            .when('/editProfile',{
                templateUrl: 'views/editProfile.html',
                controller: 'profileController'
            })      .when('/post/viewPost',{
                templateUrl:'views/viewMore.html',
                controller :'reviewPostController'
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

		$locationProvider.html5Mode(true);
}]);
