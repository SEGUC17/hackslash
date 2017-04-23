angular.module('pettts')

.controller('filterController', function($scope, $routeParams, filterService) {

    // getting the route parameter
    $scope.type = $routeParams.type

    //check the type 
    if ($scope.type !== "buy" || $scope.type !== "exchange" || $scope.type !== "shelter" || $scope.type !== "mate" || $scope.type !== "lost" || $scope.type !== "found") {
        $scope.notFound = true;
    }

    ///send request to the server and get the required posts
    filterService.get($scope.type).then(function(posts) {
        $scope.posts = posts

        if (!$scope.posts) {
            $scope.notFound = true;
        } else {
            $scope.notFound = false;
            // Sorting posts according to date descendingly
            $scope.posts.sort(function(a, b) {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            //set page attributes
            $scope.pageSize = 7;
            $scope.currentPage = 1;
            $scope.maxSize = 5;
        }

    });

});