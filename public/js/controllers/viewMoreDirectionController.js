angular.module('pettts')

.controller('viewMoreDirectionController', function($scope,$window, $location) {

  $scope.submitViewMore = function(){
    console.log($scope.post._id);
    if($scope.post._id != undefined){
      $location.path('/posts/viewMore').search({id: $scope.post._id});

      }
    else {

      console.log("No ID Found");

    }
}

});
