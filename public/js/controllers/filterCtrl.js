angular.module('pettts')

.controller('filterCtrl', function($scope, $location, $timeout, $window, $routeParams, filterService, reviewPostService) {

    $scope.token = $window.sessionStorage.accessToken;

    // getting the route parameter
    $scope.type = $routeParams.type

    //check the type
    if ($scope.type !== "buy" || $scope.type !== "exchange" || $scope.type !== "shelter" || $scope.type !== "mate" || $scope.type !== "lost" || $scope.type !== "found") {
        $scope.notFound = true;
    }

    ///send request to the server and get the required posts
    filterService.get($scope.type).then(function(posts) {
        $scope.posts = posts

        if (!$scope.posts) {
            $scope.notFound = true;
        } else {
            $scope.notFound = false;
            // Sorting posts according to date descendingly
            $scope.posts.sort(function(a, b) {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });

            $scope.posts.forEach(function(post) {
                reviewPostService.viewOwnerInfo(post._id).then(function(response) {
                    post.username = response.data
                });
            });

            $scope.submitVote = function(id, vote) {
                if (vote != "up" && vote != "down") {
                    $scope.postMessage = "You need to choose an option before you rate this post.";
                } else {
                    reviewPostService.vote(id, vote).then(function(response) {
                        $scope.postMessage = response;
                    })
                }
                $timeout(function() { $scope.postMessage = undefined }, 4000);
            }

            //set page attributes
            $scope.pageSize = 7;
            $scope.currentPage = 1;
            $scope.maxSize = 5;
        }

    });

    $scope.goTo = function(path) {
        $location.path('/' + path);
    }

    $scope.visitProfile = function(username) {
        $location.path('/profile/' + username);
    }

});