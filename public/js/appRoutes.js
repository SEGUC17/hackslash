angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

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
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'registerController'
        })

    $locationProvider.html5Mode(true);

}]);
