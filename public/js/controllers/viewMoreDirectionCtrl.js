angular.module('pettts')

.controller('viewMoreDirectionCtrl', function($scope, $window, $location) {


    //view full post in new window

    $scope.submitViewMore = function() {
        //re route by id to view the full post 
        if ($scope.post._id != undefined) {
            $location.path('/posts/viewMore').search({ id: $scope.post._id });

        }
    }


});