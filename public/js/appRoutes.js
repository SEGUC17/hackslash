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
        $locationProvider.html5Mode(true);

    }]);