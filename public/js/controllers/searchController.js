angular.module('pettts')

.controller('searchController', function($scope, $http,searchService) {
  //  $scope.formData="";
  $scope.submitSearch = function(){
    console.log($scope.formData.searchKey);
      searchService.search($scope.formData.searchKey);
  }


});
