angular.module('pettts')

.controller('postsCtrl', function($scope, $location, postsService, reviewPostService) {

    $scope.token = $window.sessionStorage.accessToken;

    postsService.get().then(function(posts) {
        $scope.posts = posts
        if (!$scope.posts) {
            $scope.notFound = true;
        } else {
            $scope.notFound = false;
            // Sorting posts according to date descendingly
            $scope.posts.sort(function(a, b) {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });

            $scope.posts.forEach(function(post){
              reviewPostService.viewOwnerInfo(post._id).then(function(response){
                post.username = response.data
              });
            });

            $scope.submitVote = function(id){
              reviewPostService.vote(id, $scope.vote).then(function(response){
                $scope.message = response;
              })
            }

            //setting page attributes
            $scope.pageSize = 7;
            $scope.currentPage = 1;
            $scope.maxSize = 5;
        }

    });

    $scope.goTo = function(path){
      $location.path('/' + path);
    }

    $scope.visitProfile = function(username){
      $location.path('/profile/' + username);
    }

});

// custom filters
angular.module('pettts')

// switch numbers stored in the database to strings to display
.filter('stringifyType', function() {
    return function(x) {
        switch (x) {
            case 1:
                return "Buy a pet";
            case 2:
                return "Shelter a pet";
            case 3:
                return "Get your pet a date";
            case 4:
                return "A pet is Lost";
            case 5:
                return "A pet is found";
            case 6:
                return "Exchange pets"
            default:
                return "";
        }
    }
})

.filter('startFrom', function() {
    return function(data, start) {
        return data.slice(start);
    }
})
