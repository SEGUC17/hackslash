angular.module('pettts')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider

        // posts page

            .when('/resetPassword/:token', {

                templateUrl: 'views/reset.html',
                controller: 'pass_ctrl'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'registerController'
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
            .when('/profile/:username', {
                templateUrl: 'views/profile.html',
                controller: 'profileController'
            })
            .when('/editProfile', {
                templateUrl: 'views/editProfile.html',
                controller: 'profileController'
            })

        .when('/reset', {
            templateUrl: 'views/reset.html',
            controller: 'pass_ctrl'
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