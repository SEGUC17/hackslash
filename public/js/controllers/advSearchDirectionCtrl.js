angular.module('pettts')

.controller('advSearchCtrl', function($scope, $window, advSearchService, $location) {
    $scope.advancedSearch = function(species,kind,type){
        //Close modal first
        $('#myModal-search').modal('hide');
        //Got to posts page with the right parameters
        $location.path('/posts/advanced').search({ species, kind, type });
    }
});