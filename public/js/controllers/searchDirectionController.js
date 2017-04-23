angular.module('pettts')

.controller('searchDirectionController', function($scope, $window, searchService, $location) {


    /// take the search key and redirect to the search route
    $scope.submitSearch = function() {
        if ($scope.searchKey) {
            $location.path('/posts/search').search({ key: $scope.searchKey });

        }
    }



});