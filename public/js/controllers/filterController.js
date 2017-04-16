angular.module('pettts')

  .controller('filterController', function($scope, $routeParams){

    // $scope.posts = [];
    //
    // postsService.get().then(function(posts){
    //   $scope.posts = posts
    //
    //   $scope.posts.sort(function(a, b){
    //     return new Date(b.date).getTime() - new Date(a.date).getTime();
    //   });
    //
    //   if($scope.posts.length == 0) {
    //     $scope.notFound = true;
    //   } else {
    //     $scope.notFound = false;
    //     $scope.pageSize = 7;
    //     $scope.currentPage = 1;
    //     $scope.maxSize = 5;
    //   }
    //
    // });

    $scope.type = $routeParams.type
});
