angular.module('pettts')

.factory('searchService', function($http, $location, $timeout, $window, reviewPostService) {

    // This Service is used to connect the Searchctrl to the API

    return {
        // Search Function is used to send The Search key to the api
        // and recieves all the desired posts at the frontend
        search: function($scope) {
            var req = {
                method: 'GET',
                url: '/post/search',
                headers: {
                    'species': $scope.searchKey
                }
            }
            return $http(req).then(function successCallback(response) {
                if (response.data.posts == undefined) {
                    // No data has been retrieved from the search .
                    $scope.notFound = true;
                    $scope.loading = false;
                    return response.data.message;
                } else {
                    // Posts data have been retrieved from the search .
                    $scope.posts = response.data.posts;
                    // Sorting posts with date .
                    $scope.posts.sort(function(a, b) {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    });

                    $scope.posts.forEach(function(post) {
                        reviewPostService.viewOwnerInfo(post._id).then(function(response) {
                            post.username = response.data
                        });
                    });
                    $scope.loading = false;
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

                    $scope.openReport = function() {
                        $scope.report = !$scope.report;
                    };

                    $scope.close = function() {
                        $scope.report = false;
                    }
                    // Making Pagination
                    $scope.pageSize = 7;
                    $scope.currentPage = 1;
                    $scope.maxSize = 5;
                    $scope.notFound = false;
                    return response.data.posts;

                }


            }, function errorCallback(response) {
                $scope.loading = false;
                return response;
            });
        }
    }

});