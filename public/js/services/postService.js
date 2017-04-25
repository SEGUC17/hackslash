angular.module('pettts')
.factory('Post', function($http, $window) {

  // This Service is used to connect the postctrl to the API

    // accessing the token from the session
    var token = $window.sessionStorage.accessToken;

    return {
        // ADD Function is used to add Post to the database
        // with specific attributes .
        add: function(post, type, $scope) {
          // Checking that the type must be entered .
            if (!type) {
                $scope.message = "you should select the type of the post";
                return;
            }
            // Every type has some different attributes .
            // callbacks by success of the added post or an error occcured .
            switch (type) {
                case "sell":
                    {
                        post.type = 1;
                        // Checking for price mush be postive .
                        if (post.price <= 0) {
                            $scope.message = "price should be a postive number";
                        }
                        var fd = new FormData();
                        for (var key in post)
                            fd.append(key, post[key]);
                        $http.post('/post/sell', fd, {
                            transformRequest: angular.indentity,
                            headers: {
                                'Content-Type': undefined,
                                'x-access-token': token
                            }
                        }).then(function successCallback(response) {
                            $scope.message = "Post Added Successfully";
                            $window.location = '/profile/' + $window.sessionStorage.username;
                        }, function errorCallback(response) {
                            $scope.message = response.data;
                            return response;
                        });
                    }
                    break;
                case "shelter":
                    {
                        post.type = 2;
                        var fd = new FormData();
                        for (var key in post)
                            fd.append(key, post[key]);
                        $http.post('/post/shelter', fd, {
                            transformRequest: angular.indentity,
                            headers: { 'Content-Type': undefined, 'x-access-token': token }
                        }).then(function successCallback(response) {
                            $scope.message = "Post Added Successfully";
                            $window.location = '/profile/' + $window.sessionStorage.username;
                        }, function errorCallback(response) {
                            $scope.message = response.data;
                            return response;
                        });
                    }
                    break;
                case "mate":
                    {
                        post.type = 3;
                        var fd = new FormData();
                        for (var key in post)
                            fd.append(key, post[key]);
                        $http.post('/post/mate', fd, {
                            transformRequest: angular.indentity,
                            headers: { 'Content-Type': undefined, 'x-access-token': token }
                        }).then(function successCallback(response) {
                            $scope.message = "Post Added Successfully";
                            $window.location = '/profile/' + $window.sessionStorage.username;
                        }, function errorCallback(response) {
                            $scope.message = response.data;
                            return response;
                        });
                    }

                    break;
                case "lost":
                    {
                        post.type = 4;
                        var fd = new FormData();
                        for (var key in post)
                            fd.append(key, post[key]);
                        $http.post('/post/lost', fd, {
                            transformRequest: angular.indentity,
                            headers: { 'Content-Type': undefined, 'x-access-token': token }
                        }).then(function successCallback(response) {
                            $scope.message = "Post Added Successfully";
                            $window.location = '/profile/' + $window.sessionStorage.username;
                        }, function errorCallback(response) {
                            $scope.message = response.data;
                            return response;
                        });
                    }
                    break;
                case "found":
                    {
                        post.type = 5;
                        var fd = new FormData();
                        for (var key in post)
                            fd.append(key, post[key]);
                        $http.post('/post/found', fd, {
                            transformRequest: angular.indentity,
                            headers: { 'Content-Type': undefined, 'x-access-token': token }
                        }).then(function successCallback(response) {
                            $scope.message = "Post Added Successfully";
                            $window.location = '/profile/' + $window.sessionStorage.username;
                        }, function errorCallback(response) {
                            $scope.message = response.data;
                            return response;
                        });
                    }
                    break;
                case "exchange":
                    {
                        post.type = 6;
                        var fd = new FormData();
                        for (var key in post)
                            fd.append(key, post[key]);
                        $http.post('/post/exchange', fd, {
                            transformRequest: angular.indentity,
                            headers: { 'Content-Type': undefined, 'x-access-token': token }
                        }).then(function successCallback(response) {
                            $scope.message = "Post Added Successfully";
                            $window.location = '/profile/' + $window.sessionStorage.username;
                        }, function errorCallback(response) {
                            $scope.message = response.data;
                            return response;
                        });
                    }
                    break;

            }

        },

        ////////////////////////
        ////////////////////////

        // Edit Function is used to edit an existing post in the database .
        edit: function(post, type, $scope, id) {
            // Checking that the type must be entered and also the ID to make changes in the right post .
                if (!type) {
                    $scope.message = "you should select the type of the post";
                    return;
                }
                if (!id) {
                    $scope.message = "invalid post";
                    return;
                }
                // Every type has some different attributes .
                // callbacks by success of the edited post or an error occcured .
                switch (type) {
                    case "sell":
                        {
                            post.type = 1;
                        }
                        break;
                    case "shelter":
                        {
                            post.type = 2;
                        }
                        break;
                    case "mate":
                        {
                            post.type = 3;
                        }

                        break;
                    case "lost":
                        {
                            post.type = 4;
                        }
                        break;
                    case "found":
                        {
                            post.type = 5;
                        }
                        break;
                    case "exchange":
                        {
                            post.type = 6;
                        }
                        break;

                }

                post.id = id;
                var fd = new FormData();
                for (var key in post)
                    fd.append(key, post[key]);
                $http.post('/post/edit', fd, {
                    transformRequest: angular.indentity,
                    headers: { 'Content-Type': undefined, 'x-access-token': token }
                }).then(function successCallback(response) {
                    $scope.message = "Post edited Successfully";
                    $window.location = '/profile/' + $window.sessionStorage.username;
                }, function errorCallback(response) {
                    $scope.message = response.data;
                    return response;
                });

            }


    }
});
