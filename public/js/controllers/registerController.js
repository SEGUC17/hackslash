var app = angular.module('pettts');

app.controller('registerController', function($scope, $http, User) {

    $scope.submitUser = function() {

        var user = $scope.user;
        User.add(user, $scope);

    };
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