angular.module('pettts')

.factory('verificationService', function($http) {

  // This Service is used to connect the verificationctrl to the API .

    return {
      // GET Function is used to make an http request to the server with the verificationToken .
        get: function(verificationToken){
            var request = {
                method: 'GET',
                url: '/email-verification/'+verificationToken
            }
            return $http(request).then(function success(response){
              // The Account has been verified .
                return response.data;
            },function error(response){
              // An Error has occured .
                return response;
            })
        }
    };
});
