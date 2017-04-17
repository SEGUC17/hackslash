angular.module('pettts')

// connecting frontend searchController with the api
.factory('searchService',function($http,$location, $window){
  var searchKey = $window.key;
    return{
            search: function(){
              var req = {
               method: 'GET',
               url: '/post/search',
               headers: {
                 'kind': searchKey
               }
             }
              return $http(req).then(function successCallback(response) {
                            console.log("entered the service");
                            console.log(response);
                          if(!response.data.posts){
                          return response.data.message;
                          console.log("No posts found");}
                          else {
                         console.log("posts from the servie "+response.data.posts);
                        return response.data.posts;

                          }
                        }, function errorCallback(response) {
                          //  $scope.message = "There is an Error";
                          console.log("there's an Error");
                            return response;
                        });
            }
    }

});
