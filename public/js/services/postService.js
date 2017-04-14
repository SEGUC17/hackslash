angular.module('postService', [])

    // connecting frontend postcontroller with the api .
    .factory('Post', function($http) {
        return {
            add : function(postData,type) {
                switch(type)
                {
                    case "sell" :
                        return $http.post('/post/sell');
                        break ;
                    case "shelter":
                        return $http.post('/post/shelter');
                        break ;
                    case "mate":
                        return $http.post('/post/mate');
                        break ;
                    case "lost":
                        return $http.post('/post/lost');
                        break ;
                    case "found":
                        return $http.post('/post/found');
                        break ;
                    case "exchange":
                        return $http.post('/post/exchange');
                        break ;

                }
            }
            ,edit :function(postData) {
                return $http.post('/post/edit');
                
            }
        }
    });