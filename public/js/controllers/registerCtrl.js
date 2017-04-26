var app = angular.module('pettts');

app.controller('registerCtrl', function($scope, $http, $window, User) {


    ///check if logged in redirect to home
    if ($window.sessionStorage.accessToken) {
        $window.location = '/profile/' + $window.sessionStorage.username;
    }

    ////////////////////////////////////
    ///////////////////////////////////
    
    // add user to the family
    $scope.submitUser = function() {
        //Check if phone number(s) entered have valid characters (+12345... or (12)345... or 12345... or 12-345...)
        $scope.message = undefined;
        //Regular expression that contains '+', '-', '(', ')', ' ' and numbers.
        var regex = /^[\d ()+-]+$/;
        var user = $scope.user;
        if($scope.user.phoneNumber1){
            if(!regex.test($scope.user.phoneNumber1)){
                $scope.message = "Invalid phone number in field Phone number 1. It should only contain numbers, '+', '(', ')' and '-'.";
                return;
            }
        }
        if($scope.user.phoneNumber2){
            if(!regex.test($scope.user.phoneNumber2)){
                $scope.message = "Invalid phone number in field Phone number 2. It should only contain numbers, '+', '(', ')' and '-'.";
                return;
            }
        }
        if($scope.user.homeNumber){
            if(!regex.test($scope.user.homeNumber)){
                $scope.message = "Invalid phone number in field Home number. It should only contain numbers, '+', '(', ')' and '-'.";
                return;
            }
        }
        //call the service function
        User.add(user, $scope);
    };
});

////////////////////////////////////
///////////////////////////////////

//directive for profile picture upload 
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