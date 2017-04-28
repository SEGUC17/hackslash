angular.module('pettts')

.controller('addEditPostCtrl', function($scope, $http, $window, Post, $routeParams) {

    $scope.token = $window.sessionStorage.accessToken;

    //send the request to the server to add the post
    $scope.submitAdd = function() {
        var post = $scope.post;
        //Character limit check on description (if provided)
        if($scope.post.description){
            if($scope.post.description.length > 300 || $scope.post.description.length < 1){
                $scope.error = true;
                $scope.message = "Your description must be less than or equal to 300 charcters in length.";
                return;
            }
        }
        //Character limit check on notes (if provided)
        if($scope.post.note){
            if($scope.post.note.length > 100 || $scope.post.note.length < 1){
                $scope.error = true;
                $scope.message = "Your notes must be less than or equal to 100 charcters in length.";
                return;
            }
        }
        //Character limit check on species
        if($scope.post.species > 30){
            $scope.error = true;
            $scope.message = "Animal species must be less than or equal to 30 charcters in length.";
            return;
        }
        //Character limit check on kind
        if($scope.post.kind > 30){
            $scope.error = true;
            $scope.message = "Animal kind must be less than or equal to 30 charcters in length.";
            return;
        }
        //Character limit check on other species (if provided)
        if($scope.post.speciesB){
            if($scope.post.speciesB > 30){
                $scope.error = true;
                $scope.message = "Other animal species must be less than or equal to 30 charcters in length.";
                return;
            }
        }
        //Character limit check on other kind (if provided)
        if($scope.post.kindB){
            if($scope.post.kindB > 30){
                $scope.error = true;
                $scope.message = "Other animal kind must be less than or equal to 30 charcters in length.";
                return;
            }
        }
        Post.add(post, post.type, $scope);
    };
    //send the request to the server to edit the post with the parameter id
    $scope.submitEdit = function() {
        var post = $scope.post;
        //Character limit check on description (if provided)
        if($scope.post.description){
            if($scope.post.description.length > 300 || $scope.post.description.length < 1){
                $scope.error = true;
                $scope.message = "Your description must be less than or equal to 300 charcters in length.";
                return;
            }
        }
        //Character limit check on notes (if provided)
        if($scope.post.note){
            if($scope.post.note.length > 100 || $scope.post.note.length < 1){
                $scope.error = true;
                $scope.message = "Your notes must be less than or equal to 100 charcters in length.";
                return;
            }
        }
        //Character limit check on species (if provided)
        if($scope.post.species){
            if($scope.post.species > 30){
                $scope.error = true;
                $scope.message = "Animal species must be less than or equal to 30 charcters in length.";
                return;
            }
        }
        //Character limit check on kind (if provided)
        if($scope.post.kind){
            if($scope.post.kind > 30){
                $scope.error = true;
                $scope.message = "Animal kind must be less than or equal to 30 charcters in length.";
                return;
            }
        }
        //Character limit check on other species (if provided)
        if($scope.post.speciesB){
            if($scope.post.speciesB > 30){
                $scope.error = true;
                $scope.message = "Other animal species must be less than or equal to 30 charcters in length.";
                return;
            }
        }
        //Character limit check on other kind (if provided)
        if($scope.post.kindB){
            if($scope.post.kindB > 30){
                $scope.error = true;
                $scope.message = "Other animal kind must be less than or equal to 30 charcters in length.";
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
