angular.module('pettts')

  .factory('postsService', ['$http', function($http) {

    return {
      // get all posts
      get: function() {
          return $http.get('/post/view')
            .then(function successCallback(res){
              console.log(res.data.posts);
              return res.data.posts;
            });
      }
    }

    // return {
    // // get all posts
    //       get: function() {
    //           return $http.get('/post/view');
    //       }
    // }

    // this.posts = [];
    //
    // $http({
    //   method: 'GET',
    //   url: '/post/view'
    // }).then(function successCallback(response) {
    //     this.posts = response.data.posts
    //   }, function errorCallback(response) {
    //     console.log(response);
    //   });
    //
    // console.log(this.posts);
    //
    // this.getPosts = function(){
    //   return this.posts;
    // }
}]);
