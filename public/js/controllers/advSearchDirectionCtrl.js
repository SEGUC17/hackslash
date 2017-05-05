angular.module('pettts')

.controller('advSearchDirectionCtrl', function($scope, $window, advSearchService, $location) {
    $scope.advancedSearch = function(species,kind,type){
        //Check for valid query
        if(!species && !kind && !type)
        {
            $scope.messageAdvanced = "Please enter a search query."
        }else{
            //Close modal first
            $('#myModal-search').modal('hide');
            //Go to posts page with the right parameters
            $location.path('/posts/advanced').search({ species, kind, type });
        }
    }
});