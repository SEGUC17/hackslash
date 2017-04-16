angular.module('pettts')

.controller('postsController', function($scope, postsService) {

    $scope.posts = [];

    postsService.get().then(function(posts){
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

// custom filters
angular.module('pettts')

// switch numbers stored in the database to strings to display
.filter('stringifyType', function() {
    return function(x) {
        switch (x) {
            case 1:
                return "Buy a pet";
            case 2:
                return "Shelter a pet";
            case 3:
                return "Get your pet a date";
            case 4:
                return "A pet is Lost";
            case 5:
                return "A pet is found";
            case 6:
                return "Exchange pets"
            default:
                return "";
        }
    }
  })

  .filter('startFrom', function(){
    return function(data, start){
      return data.slice(start);
    }
  })
