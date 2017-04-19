angular.module('pettts')


.controller('reviewPostController', function($scope, $http,$routeParams,reviewPostService){
        console.log("entered the reviewPostController");
        var post = reviewPostService.viewPostInfo($routeParams.id);
        var user = reviewPostService.viewOwnerInfo($routeParams.id);
        console.log("in reviewPostController post : " + post.gender);
        $scope.upVotes = post.Upvotes;
        $scope.downVotes = post.downVotes;
        $scope.mobile = user.phoneNumber1;
        $scope.firstName = user.firstName;
        $scope.lastName = user.lastName;
        $scope.email = user.email;

        $scope.id = $routeParams.id;
        $scope.submitVote = function() {
          if($scope.vote){
        console.log("submitVote Called : "+ $scope.vote);}
        reviewPostService.vote($routeParams.id,$scope.vote);

    }
});
