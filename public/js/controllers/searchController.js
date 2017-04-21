angular.module('pettts')

.controller('searchController', function($scope, $window, searchService, $location, $routeParams) {

    console.log("entered the search controller");
    $scope.searchKey = $routeParams.key;
    searchService.search($scope);
});