angular.module('pettts')

.controller('searchCtrl', function($scope, $window, searchService, $location, $routeParams) {

    // go search for the post 

    //set the search key in the scope
    $scope.searchKey = $routeParams.key;

    //pass the request to the service
    searchService.search($scope);
});