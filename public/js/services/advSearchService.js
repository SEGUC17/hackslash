angular.module('pettts')

.factory('advSearchService', function($http, $location, $timeout, $window, reviewPostService) {

    // This Service is used to connect the Searchctrl to the API

    return {
        // Search Function is used to send The Search key to the api
        // and recieves all the desired posts at the frontend
        advancedSearch: function(species,kind,type) {
            var req = {
                method: 'GET',
                url: '/post/search',
                headers: {
                    'species': species,
                    'kind': kind,
                    'type': type
                }
            }
            return $http(req).then(function successCallback(response) {
                $scope.loading = false;
                return response;
            }, function errorCallback(response) {
                $scope.loading = false;
                return response;
            });
        }
    }

});