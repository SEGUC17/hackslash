var app = angular.module('pettts');

app.controller('advSearchCtrl', function($scope, $http, $window, $routeParams, $timeout, $location, advSearchService, reviewPostService) {
    $scope.token = $window.sessionStorage.accessToken;
    $scope.loading = true;

    var species = $routeParams.species;
    var kind = $routeParams.kind;
    var type = $routeParams.type;

    $scope.visitProfile = function(username) {
        $location.path('/profile/' + username);
    }

    advSearchService.advancedSearch(species, kind, type).then(function (response) {
        if(response.message)
        {
            $scope.notFound = true;
            $scope.loading = false;
        }else if(response.posts){
            $scope.notFound = false;
            $scope.posts = response.posts;
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
            $scope.pageSize = 7;
            $scope.currentPage = 1;
            $scope.maxSize = 5;
            $scope.loading = false;
        }
    });
});