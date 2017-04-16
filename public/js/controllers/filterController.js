angular.module('pettts')

  .controller('filterController', function($scope, $routeParams, filterService){

    // getting the route parameter
    $scope.type = $routeParams.type
    $scope.posts = [];

    filterService.get($scope.type).then(function(posts){
      $scope.posts = posts

      if($scope.posts.length == 0) {
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

});
