angular.module('pettts')

// connecting frontend postcontroller with the api .
.factory('Post', function($http) {
    return {
        add: function(postData, type) {
            switch (type) {
                case "sell":
                    return $http.post('/post/sell', postData);
                    break;
                case "shelter":
                    return $http.post('/post/shelter', postData);
                    break;
                case "mate":
                    return $http.post('/post/mate', postData);
                    break;
                case "lost":
                    return $http.post('/post/lost', postData);
                    break;
                case "found":
                    return $http.post('/post/found', postData);
                    break;
                case "exchange":
                    return $http.post('/post/exchange', postData);
                    break;

            }
        },
        edit: function(postData) {
            return $http.post('/post/edit', postData);

        }
    }
});