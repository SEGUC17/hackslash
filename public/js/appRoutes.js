angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider

        // posts page

        .when('/resetPassword/:token', {

            templateUrl: 'views/reset.html',
            controller: 'pass_ctrl'
        })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
            .when('/forgotPassword', {
                templateUrl: 'views/forgotPassword.html',
                controller: 'pass_ctrl'
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

            .when('/reset', {
                templateUrl: 'views/reset.html',
                controller: 'pass_ctrl'
            })


        $locationProvider.html5Mode(true);

    }]);
