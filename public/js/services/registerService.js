var app = angular.module('pettts');

    app.factory('User', function($http) {
      return {
        add: function(user,$scope) {
        //  return $http.post('/register', user);
          var req = {
                            method: 'POST',
                            url: '/register',
                            
                             data: {
                        'email':user.email, 
                        'password':user.password,      
                        'username': user.username,
                        'firstName': user.firstName,
                        'middleName': user.middleName,
                        'lastName': user.lastName,
                        'phoneNumber1': user.phoneNumber1,
                        'phoneNumber2': user.phoneNumber2,
                        'homeNumber': user.homeNumber
                                    }
            }            
                           return $http(req).then(function successCallback(response) {
                            $scope.message = "verification mail sent";
                            return response;
                        }, function errorCallback(response) {
                            $scope.message = "err occcured can't register";
                            return response;
                        });
        }
      }
    })
