angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider

        // posts page

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
            .when('/profile/view', {
                templateUrl: 'views/profile.html',
                controller: 'profileController'
            })
            .when('profile/edit',{
                templateUrl: 'views/profileEdit.html',
                controller: 'profileController'
            })
        $locationProvider.html5Mode(true);

    }]);
