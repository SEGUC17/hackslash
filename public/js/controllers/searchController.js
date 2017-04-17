angular.module('pettts')

.controller('searchController', function($scope, searchService) {

  $scope.searchKey = "";
  console.log("mohamed");
  console.log($scope.searchKey);

  $scope.submitSearch = function(){

    console.log("mohamed");
    console.log($scope.searchKey);

    if($scope.searchKey){
      console.log($scope.searchKey);
    } else {
      console.log("mahmoud");
    }

    searchService.search($scope.searchKey).then(function(posts){

      $scope.posts = posts

      if(!$scope.posts) {
        $scope.notFound = true;
      } else {
        $scope.notFound = false;
        // Sorting posts according to date descendingly
        $scope.posts.sort(function(a, b){
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        $scope.pageSize = 7;
        $scope.currentPage = 1;
        $scope.maxSize = 5;
      }


    });
  }


});
