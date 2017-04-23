angular.module('pettts')

.controller('reviewPostController', function($scope, $window, $http, $routeParams, reviewPostService) {
    console.log("entered the reviewPostController");
    $scope.token = $window.sessionStorage.accessToken;
    $scope.id = $routeParams.id;
    $scope.submitVote = function() {
        if ($scope.vote) {
            console.log("submitVote Called : " + $scope.vote);
        }
        //var response = reviewPostService.vote($routeParams.id,$scope.vote);
        reviewPostService.vote($routeParams.id, $scope.vote).then(function(response) {
            $scope.message = response;
        });
    }

    reviewPostService.viewPostInfo($routeParams.id).then(function(response) {
        $scope.exchange = undefined;
        $scope.sell = undefined;
        $scope.upVotes = response.data.upVote;
        $scope.downVotes = response.data.downVote;
        $scope.email = response.data.ownerEmail;
        if (response.data.image) {
            $scope.picture = response.data.image.substring(7, response.data.image.length);
        }
        $scope.kind = response.data.kind;
        $scope.gender = response.data.gender;
        $scope.species = response.data.species;
        $scope.description = response.data.description;
        console.log(response.data.type);
        if (response.data.type == 1) {
            $scope.sell = 1;
            $scope.price = response.data.price;
        }
        if (response.data.type == 6) {
            $scope.exchange = 1;
            $scope.kindB = response.data.kindB;
            $scope.genderB = response.data.genderB;
            $scope.speciesB = response.data.speciesB;
        }
        if (response.data.note)
            $scope.note = response.data.note;



    });

    reviewPostService.viewOwnerInfo($routeParams.id).then(function(response) {
        //$scope.mobile = response.data.phoneNumber1;
        //console.log(response.data.phoneNumber1);
        //$scope.firstName = response.data.firstName;
        //$scope.lastName = response.data.lastName;
        $scope.username = response.data;
    });
});