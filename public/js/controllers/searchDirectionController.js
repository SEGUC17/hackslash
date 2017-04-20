angular.module('pettts')

.controller('searchDirectionController', function($scope,$window, searchService, $location) {

  $scope.submitSearch = function(){
    if($scope.searchKey){
      $location.path('/posts/search').search({key: $scope.searchKey});

      }
    else {
      console.log("No Search Key Found");

    }
}



});
