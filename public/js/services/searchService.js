angular.module('pettts')

.factory('searchService', function($http, $location, $window) {

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
                    return response.data.message;
                } else {
                  // Posts data have been retrieved from the search .
                    $scope.posts = response.data.posts;
                    // Sorting posts with date .
                    $scope.posts.sort(function(a, b) {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                    });
                    // Making Pagination
                    $scope.pageSize = 7;
                    $scope.currentPage = 1;
                    $scope.maxSize = 5;
                    $scope.notFound = false;
                    return response.data.posts;

                }

            }, function errorCallback(response) {
                return response;
            });
        }
    }

});
