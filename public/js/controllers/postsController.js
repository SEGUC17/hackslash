angular.module('pettts')

  .controller('postsController',function($scope, postsService){

     //$scope.hao = "hoahoa";
     $scope.posts = JSON.stringify(postsService.get());
     $scope.hao = postsService.hao;

      if(!$scope.posts)
  		  $scope.notFound = true;
  	  else
  		  $scope.notFound = false;

});
