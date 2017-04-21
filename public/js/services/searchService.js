angular.module('pettts')

// connecting frontend searchController with the api
.factory('searchService', function($http, $location, $window) {
    //var searchKey = $scope.searchKey;
    return {
        search: function($scope) {
            //console.log("in search in service"+$scope.searchKey);
            var req = {
                method: 'GET',
                url: '/post/searchAndFilter',
                headers: {
                    'species': $scope.searchKey
                        // 'species':$scope.searchKey
                }
            }
            return $http(req).then(function successCallback(response) {
                console.log("entered the service");
                //    console.log(response);
                if (response.data.posts == undefined) {
                    $scope.notFound = true;
                    console.log("Error");
                    // $location.path('/posts/search');
                    // $location.replace();
                    return response.data.message;
                    //console.log(response)
                } else {
                    console.log("notfound " + $scope.notFound);
                    $scope.posts = response.data.posts;
                    $scope.posts.sort(function(a, b) {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    });
                    $scope.pageSize = 7;
                    $scope.currentPage = 1;
                    $scope.maxSize = 5;
                    $scope.notFound = false;
                    //  $location.path('/posts/search');
                    //  $location.replace();
                    return response.data.posts;

                }

            }, function errorCallback(response) {
                //  $scope.message = "There is an Error";
                console.log("there's an Error");
                return response;
            });
        }
    }

});