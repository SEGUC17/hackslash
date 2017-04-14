angular.module('postService', [])

    // connecting frontend postcontroller with the api .
    .factory('Post', function($http) {
        return {
            add : function(postData,type) {
                return $http.get('/api/todos');
                switch(type)
                {
                    case "sell" :
                        return $http.post('/post/sell');
                        break ;
                    case "shelter":
                        return $http.post('/post/sell');
                        break ;
                    case "mate":
                        return $http.post('/post/sell');
                        break ;
                    case "lost":
                        return $http.post('/post/sell');
                        break ;
                    case "found":
                        return $http.post('/post/sell');
                        break ;
                    case "exchange":
                        return $http.post('/post/sell');
                        break ;

                }
            }
        }
    });