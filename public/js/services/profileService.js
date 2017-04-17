angular.module('pettts')
//Services to connect with back end routes.
.factory('profileService',function($http,$window){
    var userEmail = $window.sessionStorage.email;
    var userToken = $window.sessionStorage.accessToken;
    return{
        //Service to call viewProfile
        view : function(){
            var request = {
                method: 'GET',
                url: '/profile/view',
                headers: {
                    'x-access-token': userToken,
                    'email': userEmail //TODO:REDIRECT TO DIFFERENT USERS
                }
            };
            return $http(request).then(function success(response){
                return {
                    'success':true,
                    'data': response.data
                };
            },function error(response){
                return {
                    'success':false,
                    'message':'Error in service request'
                };
            });
        },
        //Service to call changePassword
        pass : function(password,newPassword,$scope){
            var request = {
                method: 'POST',
                url: '/profile/pass',
                data: {
                    'password': password,
                    'verify': password,
                    'newPassword': newPassword,
                    'token': userToken
                }
            };
            return $http(request).then(function success(response){
                $window.location = '/profile';
            },function error(response){
                return {
                    'success':false,
                    'message':'Error in service request'
                };
            });
        }
    }
});