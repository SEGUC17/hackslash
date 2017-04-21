angular.module('pettts')

.controller('postController', function($scope, $http, $window, Post, $routeParams) {

    $scope.token = $window.sessionStorage.accessToken;
    //$scope.post.type = "sell";
    $scope.submitAdd = function() {

        var post = $scope.post;

        Post.add(post, post.type, $scope);

    };

    $scope.submitEdit = function() {
        // var oldPost = Post.getPost($routeParams.id);
        // console.log(oldPost);
        var post = $scope.post;

        Post.edit(post, post.type, $scope, $routeParams.id);


    }
});

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