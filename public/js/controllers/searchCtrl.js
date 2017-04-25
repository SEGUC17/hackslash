angular.module('pettts')

.controller('searchCtrl', function($scope, $location, $window, searchService, $location, $routeParams) {

    $scope.token = $window.sessionStorage.accessToken;

    // go search for the post

    //set the search key in the scope
    $scope.searchKey = $routeParams.key;

    //pass the request to the service
    searchService.search($scope);

    $scope.goTo = function(path){
      $location.path('/' + path);
    }

    $scope.visitProfile = function(username){
      $location.path('/profile/' + username);
    }
});
