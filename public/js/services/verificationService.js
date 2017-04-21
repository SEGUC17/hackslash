angular.module('pettts')

.factory('verificationService', function($http) {
    return {
        get: function(verificationToken){
            var request = {
                method: 'GET',
                url: '/email-verification/'+verificationToken
            }
            return $http(request).then(function success(response){
                return response.data;
            },function error(response){
                return response;
            })
        }
    };
});