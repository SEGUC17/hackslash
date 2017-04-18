angular.module('pettts')

.controller('searchController', function($scope,$window, searchService, $location , $routeParams) {

  console.log("entered the search controller");
  $scope.searchKey = $routeParams.key;
  searchService.search($scope);

//   $scope.submitSearch = function(){
//     if($scope.searchKey){
//       //  console.log("searchKey is :- "+$scope.searchKey);
//
//       //  $window.location.href = 'posts/search';
//       $location.path('/posts/search');
//       $location.replace();
//       $scope.posts = searchService.search($scope);
//
//   //    $location.replace();
//
//
//     }
//     else {
//       console.log("No Search Key Found");
//     //  $window.location.href = 'posts/search';
//
//     }
// }

/*
    searchService.search().then(function(posts){

        if(posts){
          console.log("inside the internal if "+posts);
          $scope.notFound = false;
        }
        else {
          $scope.notFound = true;
        }
      //console.log("Response in controller " );
      //console.log(response.data.posts);
        $scope.posts = posts;
      //$window.location = '/posts/search';

    });*/

});




/*  $scope.posts = response.data.posts;
  if(!$scope.posts) {
    $scope.notFound = true;
    console.log("posts ::"+$scope.posts);
    console.log("mfiish haga");
  }

  else {
    $scope.notFound = false;
    // Sorting posts according to date descendingly
    $scope.posts.sort(function(a, b){
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    $scope.pageSize = 7;
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $window.location.href = 'views/posts.html';

  }*/
