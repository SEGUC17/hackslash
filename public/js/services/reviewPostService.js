angular.module('pettts')

// connecting frontend postcontroller with the api .

.factory('reviewPostService',function($http,$window){
  var token = $window.sessionStorage.accessToken;
  if(!token)
    $window.location = '/login';
  else
  return{
    vote:function(id,vote){
      var value =0;
      if(vote == "up"){
        value = 1;
      }
      else if (vote=="down") {
        value = 0;
      }

      var req = {
        method: 'POST',
        url: '/post/review',
        headers: {
            'id':id
        },
        data: {'vote':value,'token':token}
      }
        return $http(req).then(function successCallback(response){
        //console.log("Going to back");
        //console.log(vote + " "+id );

        return response.data;
      }
        , function errorCallback(response) {
          console.log("There's an Error");
            return response;
      });
    },

      viewPostInfo:function(id){
        var req ={
          method:'GET',
          url   :'/post/specificPost',
          headers:{
            '_id':id
          }
        }
      return $http(req).then(function successCallback(response){
        console.log(response);
        return response;},
        function errorCallback(response){
          console.log("Error in reviewPostService");
          return response;
        }
      );}

    ,

     viewOwnerInfo:function(id){
       var req ={
         method:'GET',
         url   :'/post/specificUser',
         headers:{
           '_id':id
         }
       }
        return $http(req).then(function successCallback(response){
          return response;},
          function errorCallback(response){
            return response;
          }
        );}

      }
});
