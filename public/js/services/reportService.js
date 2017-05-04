angular.module('pettts')
.factory('reportService', function($http, $window){
    return {
        reportPost: function(id,message){
            var request = {
                method: 'POST',
                url: '/post/report',
                data: {
                    'token': $window.sessionStorage.accessToken,
                    'message': message,
                    'id': id
                }
            };
            return $http(request).then(function success(response) {
                return response.data;
            },function error(response){
                return response.data;
            });
        }
    }
})