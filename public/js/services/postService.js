angular.module('pettts')

// connecting frontend postcontroller with the api .
.factory('Post', function($http) {
    return {

        ///add callbacks for success and failure TODO
        add: function(post, type) {
            switch (type) {
                case "sell":
                    {
                        post.type = 1;
                        return $http.post('/post/sell', post);
                    }
                    break;
                case "shelter":
                    {
                        post.type = 2;
                        return $http.post('/post/shelter', post);
                    }
                    break;
                case "mate":
                    {
                        post.type = 3;
                        return $http.post('/post/mate', post);
                    }

                    break;
                case "lost":
                    {
                        post.type = 4;
                        return $http.post('/post/lost', post);
                    }
                    break;
                case "found":
                    {
                        post.type = 5;
                        return $http.post('/post/found', post);
                    }
                    break;
                case "exchange":
                    {
                        post.type = 6;
                        return $http.post('/post/exchange', post);
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
            return $http.post('/post/edit', post);

        }
    }
});