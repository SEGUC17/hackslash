angular.module('pettts')

.controller('testController',function($scope , $window , $http ){

    console.log("entered the test controller ");
    $scope.submitSearch = function(){
    $window.key=$scope.searchKey;
    console.log ("window key is : "+ $window.key);
    $window.location = '/posts/search';
    }


});
