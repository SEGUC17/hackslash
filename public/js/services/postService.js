angular.module('pettts')

// connecting frontend postcontroller with the api .
.factory('Post', function($http, $window) {
    var token = $window.sessionStorage.accessToken;
    return {

        ///add callbacks for success and failure TODO
        add: function(post, type, $scope) {
            if (!type) {
                $scope.message = "you should select the type of the post";
                return;
            }

            switch (type) {
                case "sell":
                    {
                        post.type = 1;
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
                            return response;
                        }, function errorCallback(response) {
                            $scope.message = "There is an Error";
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
                            return response;
                        }, function errorCallback(response) {
                            $scope.message = "There is an Error";
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
                            return response;
                        }, function errorCallback(response) {
                            $scope.message = "There is an Error";
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
                            return response;
                        }, function errorCallback(response) {
                            $scope.message = "There is an Error";
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
                            return response;
                        }, function errorCallback(response) {
                            $scope.message = "There is an Error";
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
                            return response;
                        }, function errorCallback(response) {
                            $scope.message = "There is an Error";
                            return response;
                        });
                    }
                    break;

            }

        },
        edit: function(post, type, $scope, id) {

                if (!type) {
                    $scope.message = "you should select the type of the post";
                    return;
                }
                if (!id) {
                    $scope.message = "invalid post";
                    return;
                }
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
                ///add id of post to be edited
                /*  var req = {
                      method: 'POST',
                      url: '/post/edit',
                      headers: {
                          'x-access-token': token
                      },
                      data: { post, id }
                  }
                  return $http(req).then(function successCallback(response) {
                      $scope.message = "Post edited Successfully";
                      return response;
                  }, function errorCallback(response) {
                      $scope.message = "There is an Error";
                      return response;
                  });*/
                var fd = new FormData();
                for (var key in post)
                    fd.append(key, post[key]);
                $http.post('/post/edit', fd, {
                    transformRequest: angular.indentity,
                    headers: { 'Content-Type': undefined, 'x-access-token': token }
                }).then(function successCallback(response) {
                    $scope.message = "Post edited Successfully";
                    return response;
                }, function errorCallback(response) {
                    $scope.message = "There is an Error";
                    return response;
                });

            }
            // ,
            // getPost : function (id) {
            //   var req = {
            //       method: 'get',
            //       url: '/post/postInfo', // The URL
            //       headers: {
            //           'id': id
            //       }
            //   }
            //   return $http(req).then(function successCallback(response) {
            //       return response;
            //   }, function errorCallback(response) {
            //       return response;
            //   });
            //
            //
            // }
    }
});