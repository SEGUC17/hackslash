angular.module('pettts')

.controller('postController', function($scope, $http, $window, Post, $routeParams) {

    $scope.token = $window.sessionStorage.accessToken;

    //send the request to the server to add the post
    $scope.submitAdd = function() {

        var post = $scope.post;
        Post.add(post, post.type, $scope);

    };
    //send the request to the server to edit the post with the parameter id
    $scope.submitEdit = function() {
        var post = $scope.post;
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