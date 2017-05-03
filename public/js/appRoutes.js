angular.module('pettts')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
        //User routes
        //Static page routes
        //StarterPage route
            .when('/', {
                templateUrl: 'views/starterPage.html'
            })
            //About route
            .when('/info', {
                templateUrl: 'views/about.html'
            })
            //Authentication routes
            //Registration route
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'registerCtrl'
            })
            //Response to email verification route
            .when('/v/:verification', {
                templateUrl: 'views/emailVerification.html',
                controller: 'verificationCtrl'
            })
            //Post routes
            //View all posts route
            .when('/posts', {
                templateUrl: 'views/posts.html',
                controller: 'postsCtrl'
            })
            //Filter posts route
            .when('/posts/f/:type', {
                templateUrl: 'views/filter.html',
                controller: 'filterCtrl'
            })
            //Search posts route
            .when('/posts/search', {
                templateUrl: 'views/search.html',
                controller: 'searchCtrl'
            })
            //Advanced Search route
            .when('/advanced',{
                templateUrl: 'views/advSearch.html',
                controller: 'advSearchCtrl'
            })
            //Payment routes
            //Stripe route
            .when('/charge', {
                templateUrl: 'views/charge.html',
            })
            //Client routes
            //Authentication routes
            //Login route
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
            //Forgot password route
            .when('/forgotPassword', {
                templateUrl: 'views/forgotPassword.html',
                controller: 'passCtrl'
            })
            //Reset password route
            .when('/resetPassword/:token', {
                templateUrl: 'views/reset.html',
                controller: 'passCtrl'
            })
            //Post routes
            //Add a new post route
            .when('/post/new', {
                templateUrl: 'views/addPost.html',
                controller: 'addEditPostCtrl'
            })
            //Edit a post route
            .when('/post/edit', {
                templateUrl: 'views/editPost.html',
                controller: 'addEditPostCtrl'
            })
            //View a single post route
            .when('/posts/viewMore', {
                templateUrl: 'views/viewMore.html',
                controller: 'reviewPostCtrl'
            })
            //Profile Routes
            //View profile route
            .when('/profile/:username', {
                templateUrl: 'views/profile.html',
                controller: 'profileCtrl'
            })
            //Edit profile route
            .when('/editProfile', {
                templateUrl: 'views/editProfile.html',
                controller: 'profileCtrl'
            })
            //Default route (Page not Found)
            .when('/notFound', {
                templateUrl: 'views/pageNotFound.html'
            })
            .otherwise({
                redirectTo: '/notFound'
            });

        $locationProvider.html5Mode(true);
    }]);