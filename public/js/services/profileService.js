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
          
        //Service to call rateUser
        rate : function(rating,rated,$scope){
            var request = {
                method: 'POST',
                url: '/profile/rate',
                data: {
                    'remail': rated,
                    'rate': rating,
                    'token': userToken
                }
            };
            console.log(request);
            return $http(request).then(function success(response){
                $window.location = '/profile';

        //Service to call deleteUser
        delete : function(password,$scope){
           var request = {
                method: 'POST',
                url: '/profile/delete',
                data: {
                    'password': password,
                    'verify': password,

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
                $window.sessionStorage.accessToken = null;
                $window.sessionStorage.email = null;
                $window.location = '/posts';
                $window.location = '/profile';
            },function error(response){
                return {
                    'success':false,
                    'message':'Error in service request'
                };
            });
        },
        //Service to call editProfile
        edit : function(user,$scope){
            if(user){
                var request = {
                    method: 'POST',
                    url: '/profile/edit',
                    data: {
                        'username': user.username,
                        'firstName': user.firstName,
                        'middleName': user.middleName,
                        'lastName': user.lastName,
                        'phoneNumber1': user.phoneNumber1,
                        'phoneNumber2': user.phoneNumber2,
                        'homeNumber': user.homeNumber,
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
        },
        }
    }
});