angular.module('pettts')


.controller('reviewPostController', function($scope, $http,$routeParams,reviewPostService){
        console.log("entered the reviewPostController");

      /*  var post = reviewPostService.viewPostInfo($routeParams.id);
        var user = reviewPostService.viewOwnerInfo($routeParams.id);
        console.log("in reviewPostController post : " + post.gender);
        $scope.upVotes = post.Upvotes;
        $scope.downVotes = post.downVotes;
        $scope.mobile = user.phoneNumber1;
        $scope.firstName = user.firstName;
        $scope.lastName = user.lastName;
        $scope.email = user.email;*/

        $scope.id = $routeParams.id;
        $scope.submitVote = function() {
          if($scope.vote){
        console.log("submitVote Called : "+ $scope.vote);}
        reviewPostService.vote($routeParams.id,$scope.vote);

    }

     reviewPostService.viewPostInfo($routeParams.id).then(function (response){
       $scope.upVotes = response.data.upVote;
       $scope.downVotes = response.data.downVote;
       $scope.email = response.data.ownerEmail;
       $scope.picture = response.data.images[0];


       console.log("Response::  ");
       console.log(response.data.ownerEmail);
     });

     reviewPostService.viewOwnerInfo($routeParams.id).then(function (response){
       $scope.mobile = response.data.phoneNumber1;
       console.log(response.data.phoneNumber1);
       $scope.firstName = response.data.firstName;
       $scope.lastName = response.data.lastName;
     });












});
