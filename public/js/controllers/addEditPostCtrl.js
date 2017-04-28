angular.module('pettts')

.controller('addEditPostCtrl', function($scope, $http, $window, Post, $routeParams) {

    $scope.token = $window.sessionStorage.accessToken;

    //send the request to the server to add the post
    $scope.submitAdd = function() {
        var post = $scope.post;
        if($scope.post.description){
            if($scope.post.description.length > 300 || $scope.post.description.length < 1){
                $scope.error = true;
                $scope.message = "Your description must be less than or equal to 300 charcters in length.";
                return;
            }
        }
        if($scope.post.note){
            if($scope.post.note.length > 100 || $scope.post.note.length < 1){
                $scope.error = true;
                $scope.message = "Your notes must be less than or equal to 100 charcters in length.";
                return;
            }
        }
        Post.add(post, post.type, $scope);
    };
    //send the request to the server to edit the post with the parameter id
    $scope.submitEdit = function() {
        var post = $scope.post;
        if($scope.post.description){
            if($scope.post.description.length > 300 || $scope.post.description.length < 1){
                $scope.error = true;
                $scope.message = "Your description must be less than or equal to 300 charcters in length.";
                return;
            }
        }
        if($scope.post.note){
            if($scope.post.note.length > 100 || $scope.post.note.length < 1){
                $scope.error = true;
                $scope.message = "Your notes must be less than or equal to 100 charcters in length.";
                return;
            }
        }
        Post.edit(post, post.type, $scope, $routeParams.id);
    }
});

//directive for file upload
app.directive('ngFileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.ngFileModel);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            element.bind('change', function() {

                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);

                });
            });
        }
    };
}]);
