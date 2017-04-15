angular.module('pettts')

.controller('postsController', function($scope, postsService) {

    postsService.get().then(function(posts) {
        $scope.posts = posts
    });
    //$scope.posts = postsService.get();

    if (!$scope.posts)
        $scope.notFound = true;
    else
        $scope.notFound = false;

});

// custom filter
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
});