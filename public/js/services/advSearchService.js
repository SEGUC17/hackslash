angular.module('pettts')

.factory('advSearchService', function($http, $location, $timeout, $window, reviewPostService) {

    // This Service is used to connect the Searchctrl to the API

    return {
        // Search Function is used to send The Search key to the api
        // and recieves all the desired posts at the frontend
        advancedSearch: function(species,kind,type) {
            var req = {
                method: 'GET',
                url: '/post/searchAndfilter',
                headers: {
                    'species': species,
                    'kind': kind,
                    'type': type
                }
            }
            return $http(req).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return response.data;
            });
        }
    }

});