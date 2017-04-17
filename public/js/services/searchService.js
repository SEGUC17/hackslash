angular.module('pettts')

// connecting frontend searchController with the api
.factory('searchService',function($http,$location, $window){
    return{
            search: function(searchKey){
              var req = {
               method: 'GET',
               url: '/post/search',
               headers: {
                 'kind': searchKey
               }
             }
              return $http(req).then(function successCallback(response) {
                          //  $scope.message = "Post Added Successfully";
                          // $window.location = '/views/posts.html';
                            console.log(response);
                            return response.data.posts;
                        }, function errorCallback(response) {
                          //  $scope.message = "There is an Error";
                            return response;
                        });
            }
    }

});
