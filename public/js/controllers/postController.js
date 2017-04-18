angular.module('pettts')

.controller('postController', function($scope, $http, Post , $routeParams) {


    $scope.submitAdd = function() {

        var post = $scope.post;
        Post.add(post, post.type, $scope);
        };

    $scope.submitEdit = function() {
        // var oldPost = Post.getPost($routeParams.id);
        // console.log(oldPost);
        var post = $scope.post;
        Post.edit(post, post.type , $scope , $routeParams.id);


    }
});
