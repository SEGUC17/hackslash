angular.module('indexcontroller',[]).controller('indexController',function($scope , indexService){
    $scope.posts = indexService.get();
    if(!$scope.posts)
		  $scope.notFound = true;
	  else
		  $scope.notFound = false;


});
