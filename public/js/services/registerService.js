var app = angular.module('pettts');

app.factory('User', function($http, $window) {

    // This Service is used to connect the reviewPostctrl to the API

    return {
        // Add Function is used to add the user in the database of the server
        // by sending the required information about the new user .
        add: function(user, $scope) {
            $scope.error = undefined;
            var fd = new FormData();
            for (var key in user)
                fd.append(key, user[key]);
            $http.post('/register', fd, {
                transformRequest: angular.indentity,
                headers: { 'Content-Type': undefined }
            }).then(function successCallback(response) {
                // verification mail has been sent Successfully .
                $scope.message = "verification mail sent";
                $scope.error = undefined;
                $scope.loading = false;
                return response;
            }, function errorCallback(response) {
                // An Error has occcured .
                $scope.error = true;
                $scope.message = response.data.message;
                $scope.loading = false;
                return response;
            });
        }
    }
})