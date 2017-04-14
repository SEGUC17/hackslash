angular.module('postController', [])

    .controller('postController', function($scope, $http, Post) {
        $scope.formData = {};
        var type = "";
        // addPost ===========================
        $scope.addPost = function() {
            Post.add($scope.formData)
                .success(function() {
                     $scope.formData = {}; // clear the form so our user is ready to enter another
                });
        };
        
        // editPost ==========================
        $scope.editPost = function() {
            switch(formData.type)
            {
                case 1 :  
                    type = "sell";
                    break ;
                case 2 :  
                    type = "shelter";
                    break ;
                case 3 :  
                    type = "mate";
                    break ;
                case 4 :  
                    type = "lost";
                    break ;
                case 5 :  
                    type = "found";
                    break ;  
                case 6 :  
                    type = "exchange";
                    break ;   
                default :
                    type = "error";
                    break ;
            }
            if(type != "error")
            {
            Post.edit($scope.formData,type)
                .success(function() {
                     $scope.formData = {}; // clear the form so our user is ready to enter another
                });

                }; 
             }
    });