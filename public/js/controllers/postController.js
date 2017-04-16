angular.module('pettts')

.controller('postController', function($scope, $http, Post) {

    $scope.submitAdd = function() {

        var post = $scope.post;
        Post.add(post, post.type, $scope);


    };
    $scope.submitEdit = function() {

        var post = $scope.post;
        Post.edit(post, post.type);


    }
});