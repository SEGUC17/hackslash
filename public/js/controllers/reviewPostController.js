angular.module('pettts')

.controller('reviewPostController', function($scope, $window, $http, $routeParams, reviewPostService) {

    // get the token and the post id
    $scope.token = $window.sessionStorage.accessToken;
    $scope.id = $routeParams.id;

    ////////////////////////////////////
    ///////////////////////////////////

    // vote for the post I like it :)
    $scope.submitVote = function() {
        reviewPostService.vote($routeParams.id, $scope.vote).then(function(response) {
            $scope.message = response;
        });
    }


    ////////////////////////////////////
    ///////////////////////////////////

    // view the post information
    reviewPostService.viewPostInfo($routeParams.id).then(function(response) {
        $scope.exchange = undefined;
        $scope.sell = undefined;
        $scope.upVotes = response.data.upVote;
        $scope.downVotes = response.data.downVote;
        $scope.email = response.data.ownerEmail;
        if (response.data.image) {
            //formulate the post image path
            $scope.picture = response.data.image.substring(7, response.data.image.length);
        }
        //set the post attributes in the $scope
        $scope.kind = response.data.kind;
        $scope.gender = response.data.gender;
        $scope.species = response.data.species;
        $scope.description = response.data.description;
        $scope.date = response.data.date;
        if (response.data.type == 1) {
            // check if the post type is sell
            $scope.sell = 1;
            $scope.price = response.data.price;
        }
        if (response.data.type == 6) {
            //check if the post type is exchange
            $scope.exchange = 1;
            $scope.kindB = response.data.kindB;
            $scope.genderB = response.data.genderB;
            $scope.speciesB = response.data.speciesB;
        }

        //notes for the post if someone responded the user should update it 
        if (response.data.note)
            $scope.note = response.data.note;
    });

    ////////////////////////////////////
    ///////////////////////////////////

    // view the info of the post owner
    reviewPostService.viewOwnerInfo($routeParams.id).then(function(response) {
        $scope.username = response.data;
    });
});
