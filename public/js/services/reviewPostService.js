angular.module('pettts')

// connecting frontend postcontroller with the api .

.factory('reviewPostService',function($http, $window){
  var token = $window.sessionStorage.accessToken;

  return{
    vote:function($scope,vote){
      var value =0;
      if(vote == "up"){
        value = 1;
      }
      else if (vote="down") {
        value = 0;
      }

      var req = {
        method: 'POST',
        url: '/post/review',
        headers: {
            'x-access-token': token,
            '_id':'58e019e6a6e4f742502ab492'
        },
        body: {'vote':value}

      }
      return $http(req).then(function successCallback(response){
        $scope.message = "Your vote was submitted Successfully";
        return response;}
        , function errorCallback(response) {
            $scope.message = "There is an Error submitting your vote";
            return response;
      });



    }
  }

});
