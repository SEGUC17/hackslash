angular.module('postController', [])

    .controller('postController', function($scope, $http, Post) {
        $scope.formData = {};

        // addPost ===========================
        $scope.addPost = function() {
            Post.add($scope.formData)
                .success(function() {
                     $scope.formData = {}; // clear the form so our user is ready to enter another
                });
        };
        
        // editPost ==========================
        

    });