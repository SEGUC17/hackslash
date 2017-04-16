angular.module('pettts')

// connecting frontend postcontroller with the api .
.factory('Post', function($http , $window) {
    var token = $window.sessionStorage.accessToken ;
    var error = "Wrong information" ;
    var success = "Successfull";
    return {

        ///add callbacks for success and failure TODO
        add: function(post, type) {
            switch (type) {
                case "sell":
                    {
                        post.type = 1;
                        var req = {
                        method: 'POST',
                        url: '/post/sell',
                        headers: {
                        'x-access-token': token
                        },
                        data: post
                        }
                        return $http(req).then(function successCallback(response) {
                            return success ;
                        }, function errorCallback(response) {
                            return error ;
                            });;
                    }
                    break;
                case "shelter":
                    {
                        post.type = 2;
                        var req = {
                        method: 'POST',
                        url: '/post/shelter',
                        headers: {
                        'x-access-token': token
                        },
                        data: post
                        }
                        return $http(req).then(function successCallback(response) {
                            return success ;
                        }, function errorCallback(response) {
                            return error ;
                        });;
                    }
                    break;
                case "mate":
                    {
                        post.type = 3;
                        var req = {
                        method: 'POST',
                        url: '/post/mate',
                        headers: {
                        'x-access-token': token
                        },
                        data: post
                        }
                        return $http(req).then(function successCallback(response) {
                            return success ;
                        }, function errorCallback(response) {
                            return error ;
                        });;
                    }

                    break;
                case "lost":
                    {
                        post.type = 4;
                        var req = {
                        method: 'POST',
                        url: '/post/lost',
                        headers: {
                        'x-access-token': token
                        },
                        data: post
                        }
                        return $http(req).then(function successCallback(response) {
                            return success ;
                        }, function errorCallback(response) {
                            return error ;
                        });;
                    }
                    break;
                case "found":
                    {
                        post.type = 5;
                        var req = {
                        method: 'POST',
                        url: '/post/found',
                        headers: {
                        'x-access-token': token
                        },
                        data: post
                        }
                        return $http(req).then(function successCallback(response) {
                            return success ;
                        }, function errorCallback(response) {
                            return error ;
                        });;
                    }
                    break;
                case "exchange":
                    {
                        post.type = 6;
                        var req = {
                        method: 'POST',
                        url: '/post/exchange',
                        headers: {
                        'x-access-token': { postData: post }
                        },
                        data: post
                        }
                        return $http(req).then(function successCallback(response) {
                            return success ;
                        }, function errorCallback(response) {
                            return error ;
                        });;
                    }
                    break;

            }
        },
        edit: function(post, type) {
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
            var req = {
                        method: 'POST',
                        url: '/post/edit',
                        headers: {
                        'x-access-token': token
                        },
                        data: post
                        }

                        return $http(req).then(function successCallback(response) {
                            return success ;
                        }, function errorCallback(response) {
                            return error ;
                        });;
                    }
    }
});
